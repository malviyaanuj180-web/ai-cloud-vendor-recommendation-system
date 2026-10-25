
package com.cloudrecommendation.controller;

import com.cloudrecommendation.entity.RecommendationHistory;
import com.cloudrecommendation.repository.RecommendationHistoryRepository;
import com.cloudrecommendation.service.RecommendationService;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "*")
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final RecommendationHistoryRepository historyRepository;

    public RecommendationController(
            RecommendationService recommendationService,
            RecommendationHistoryRepository historyRepository) {
        this.recommendationService = recommendationService;
        this.historyRepository = historyRepository;
    }

    // Generate cloud recommendations and save the top result
    @GetMapping("/api/recommend")
    public List<Map<String, Object>> recommend(
            @RequestParam(defaultValue = "5000") double budget,
            @RequestParam(defaultValue = "100") int storage,
            @RequestParam(defaultValue = "medium") String performance,
            @RequestParam(defaultValue = "medium") String scalability) {

        if (!Double.isFinite(budget) || budget <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Budget must be a positive number.");
        }

        if (storage < 1 || storage > 100000) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Storage must be between 1 and 100000 GB.");
        }

        if (performance == null ||
                !List.of("low", "medium", "high")
                        .contains(performance.toLowerCase())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Performance must be low, medium, or high.");
        }

        if (scalability == null ||
                !List.of("low", "medium", "high")
                        .contains(scalability.toLowerCase())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Scalability must be low, medium, or high.");
        }

        List<Map<String, Object>> results =
                recommendationService.recommend(
                        budget,
                        storage,
                        performance.toLowerCase(),
                        scalability.toLowerCase());

        // Save only the top-ranked recommendation
        if (!results.isEmpty()) {
            Map<String, Object> best = results.get(0);

            RecommendationHistory history = new RecommendationHistory();
            history.setBudget(budget);
            history.setStorage(storage);
            history.setPerformance(performance.toLowerCase());
            history.setScalability(scalability.toLowerCase());
            history.setRecommendedProvider(
                    String.valueOf(best.get("provider")));
            history.setEstimatedMonthlyCostINR(
                    ((Number) best.get("estimatedMonthlyCostINR"))
                            .doubleValue());

            historyRepository.save(history);
        }

        // Keep the existing API response unchanged
        return results;
    }

    // Get all history, newest first
    @GetMapping("/api/history")
    public List<RecommendationHistory> getHistory() {
        return historyRepository.findAll(
                Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    // Delete one history record by ID
    @DeleteMapping("/api/history/{id}")
    public ResponseEntity<Void> deleteHistory(
            @PathVariable Long id) {

        if (!historyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        historyRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
