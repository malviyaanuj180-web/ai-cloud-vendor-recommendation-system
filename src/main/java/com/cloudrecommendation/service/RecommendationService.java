
package com.cloudrecommendation.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class RecommendationService {

    /*
     * Illustrative demo estimates, not official cloud-provider prices
     * or verified performance benchmarks.
     */
    private final List<Map<String, Object>> providers = List.of(
        provider("aws", "Amazon Web Services", 1500, 5, 5),
        provider("azure", "Microsoft Azure", 1600, 5, 5),
        provider("gcp", "Google Cloud", 1400, 5, 5),
        provider("oci", "Oracle Cloud Infrastructure", 1350, 4, 4),
        provider("ibm", "IBM Cloud", 1550, 4, 4),
        provider("digitalocean", "DigitalOcean", 700, 3, 3),
        provider("linode", "Akamai Cloud (Linode)", 750, 3, 3),
        provider("alibaba", "Alibaba Cloud", 1200, 4, 4)
    );

    private Map<String, Object> provider(
            String id,
            String name,
            int baseCost,
            int performanceRating,
            int scalabilityRating) {

        Map<String, Object> item = new LinkedHashMap<>();
        item.put("id", id);
        item.put("name", name);
        item.put("baseCost", baseCost);
        item.put("performanceRating", performanceRating);
        item.put("scalabilityRating", scalabilityRating);
        return Map.copyOf(item);
    }

    public List<Map<String, Object>> recommend(
            double budget,
            int storage,
            String performance,
            String scalability) {

        List<Map<String, Object>> results = new ArrayList<>();

        int requiredPerformance = rating(performance);
        int requiredScalability = rating(scalability);

        for (Map<String, Object> provider : providers) {

            double cost = ((Number) provider.get("baseCost")).doubleValue()
                    + storage * 2.0
                    + performanceSurcharge(performance);

            boolean withinBudget = cost <= budget;

            int performanceRating =
                    (int) provider.get("performanceRating");

            int scalabilityRating =
                    (int) provider.get("scalabilityRating");

            int score = 0;
            List<String> reasons = new ArrayList<>();

            // Budget fit: 0 to 40 points
            if (withinBudget) {
                score += 40;
                reasons.add("Estimated cost is within your budget");
            } else {
                reasons.add("Estimated cost exceeds your budget");
            }

            // Performance match: 0 to 25 points
            int performanceDifference =
                    Math.abs(performanceRating - requiredPerformance);

            int performancePoints = Math.max(
                    0, 25 - performanceDifference * 10);

            score += performancePoints;

            if (performanceDifference == 0) {
                reasons.add("Demo performance rating matches your preference");
            } else if (performanceRating > requiredPerformance) {
                reasons.add("Demo performance rating exceeds your requested level");
            } else {
                reasons.add("Demo performance rating is below your requested level");
            }

            // Scalability match: 0 to 25 points
            int scalabilityDifference =
                    Math.abs(scalabilityRating - requiredScalability);

            int scalabilityPoints = Math.max(
                    0, 25 - scalabilityDifference * 10);

            score += scalabilityPoints;

            if (scalabilityDifference == 0) {
                reasons.add("Demo scalability rating matches your preference");
            } else if (scalabilityRating > requiredScalability) {
                reasons.add("Demo scalability rating exceeds your requested level");
            } else {
                reasons.add("Demo scalability rating is below your requested level");
            }

            // Lower estimated cost receives up to 10 points.
            int costEfficiencyPoints = Math.max(
                    0, 10 - (int) (cost / 1000));

            score += costEfficiencyPoints;
            reasons.add("Cost-efficiency points are based on illustrative estimates");

            Map<String, Object> result = new LinkedHashMap<>();
            result.put("id", provider.get("id"));
            result.put("provider", provider.get("name"));
            result.put("estimatedMonthlyCostINR", cost);
            result.put("score", score);
            result.put("withinBudget", withinBudget);
            result.put("performanceRatingDemo", performanceRating);
            result.put("scalabilityRatingDemo", scalabilityRating);
            result.put("reasons", reasons);

            results.add(result);
        }

        results.sort(
            Comparator.<Map<String, Object>>comparingInt(
                item -> (int) item.get("score"))
                .reversed()
                .thenComparingDouble(
                    item -> ((Number) item.get("estimatedMonthlyCostINR"))
                            .doubleValue())
        );

        return results;
    }

    private int rating(String level) {
        return switch (level.toLowerCase()) {
            case "low" -> 1;
            case "medium" -> 3;
            case "high" -> 5;
            default -> throw new IllegalArgumentException(
                    "Level must be low, medium, or high");
        };
    }

    private double performanceSurcharge(String performance) {
        return switch (performance.toLowerCase()) {
            case "low" -> 0;
            case "medium" -> 500;
            case "high" -> 1000;
            default -> throw new IllegalArgumentException(
                    "Performance must be low, medium, or high");
        };
    }
}
