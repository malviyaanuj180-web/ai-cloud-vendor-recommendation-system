package com.cloudrecommendation.controller;

import com.cloudrecommendation.dto.CloudRecommendationRequest;
import com.cloudrecommendation.entity.RecommendationHistory;
import com.cloudrecommendation.repository.RecommendationHistoryRepository;
import com.cloudrecommendation.service.RecommendationService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "*")
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final RecommendationHistoryRepository historyRepository;

    public RecommendationController(RecommendationService recommendationService,
            RecommendationHistoryRepository historyRepository) {
        this.recommendationService = recommendationService;
        this.historyRepository = historyRepository;
    }

    // Full CloudWise API: workload, budget, CPU, RAM, storage, traffic and priority.
    @PostMapping("/api/recommendations")
    public List<Map<String, Object>> cloudWiseRecommendations(
            @Valid @RequestBody CloudRecommendationRequest request) {
        try {
            List<Map<String, Object>> results = recommendationService.recommend(request);
            if (!results.isEmpty()) {
                Map<String, Object> best = results.get(0);
                RecommendationHistory history = new RecommendationHistory();
                history.setBudget(request.budget());
                history.setStorage(request.storage());
                history.setWorkload(request.workload());
                history.setCpu(request.cpu());
                history.setRam(request.ram());
                history.setTraffic(request.traffic());
                history.setPriority(request.priority());
                history.setCurrency("USD");
                history.setRecommendedProvider(String.valueOf(best.get("provider")));
                history.setEstimatedMonthlyCostINR(
                        ((Number) best.get("monthly_cost")).doubleValue());
                historyRepository.save(history);
            }
            return results;
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    // Legacy endpoint retained for backward compatibility.
    @GetMapping("/api/recommend")
    public List<Map<String, Object>> recommend(
            @RequestParam(defaultValue = "5000") double budget,
            @RequestParam(defaultValue = "100") int storage,
            @RequestParam(defaultValue = "medium") String performance,
            @RequestParam(defaultValue = "medium") String scalability) {

        if (!Double.isFinite(budget) || budget <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Budget must be a positive number.");
        }
        if (storage < 1 || storage > 100000) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Storage must be between 1 and 100000 GB.");
        }
        if (performance == null || !List.of("low", "medium", "high").contains(performance.toLowerCase())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Performance must be low, medium, or high.");
        }
        if (scalability == null || !List.of("low", "medium", "high").contains(scalability.toLowerCase())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Scalability must be low, medium, or high.");
        }

        List<Map<String, Object>> results = recommendationService.recommend(
                budget, storage, performance.toLowerCase(), scalability.toLowerCase());

        if (!results.isEmpty()) {
            Map<String, Object> best = results.get(0);
            RecommendationHistory history = new RecommendationHistory();
            history.setBudget(budget);
            history.setStorage(storage);
            history.setPerformance(performance.toLowerCase());
            history.setScalability(scalability.toLowerCase());
            history.setRecommendedProvider(String.valueOf(best.get("provider")));
            history.setEstimatedMonthlyCostINR(
                    ((Number) best.get("estimatedMonthlyCostINR")).doubleValue());
            historyRepository.save(history);
        }
        return results;
    }

    @GetMapping("/api/history")
    public List<RecommendationHistory> getHistory() {
        return historyRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @DeleteMapping("/api/history/{id}")
    public ResponseEntity<Void> deleteHistory(@PathVariable Long id) {
        if (!historyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        historyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
