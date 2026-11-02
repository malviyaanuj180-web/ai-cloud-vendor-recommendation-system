package com.cloudrecommendation.service;

import com.cloudrecommendation.dto.CloudRecommendationRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecommendationService {

    /*
     * Illustrative USD demo rates and capability ratings.
     * These are not official provider prices or measured benchmarks.
     */
    private final List<Map<String, Object>> providers = List.of(
            provider("aws", "AWS", 24, 5, 5, 5, 5, 5, 5),
            provider("azure", "Microsoft Azure", 27, 5, 4, 5, 5, 5, 5),
            provider("gcp", "Google Cloud", 22, 5, 5, 5, 5, 5, 4),
            provider("oci", "Oracle Cloud", 20, 4, 4, 5, 4, 4, 5),
            provider("ibm", "IBM Cloud", 25, 4, 4, 5, 4, 5, 5),
            provider("digitalocean", "DigitalOcean", 12, 4, 3, 3, 3, 4, 3),
            provider("linode", "Akamai Cloud", 13, 4, 3, 3, 3, 4, 3),
            provider("alibaba", "Alibaba Cloud", 18, 4, 4, 4, 4, 4, 4)
    );

    private Map<String, Object> provider(String id, String name, double base,
            int web, int ml, int database, int analytics, int scalability, int reliability) {
        Map<String, Object> p = new LinkedHashMap<>();
        p.put("id", id);
        p.put("name", name);
        p.put("base", base);
        p.put("web", web);
        p.put("ml", ml);
        p.put("database", database);
        p.put("analytics", analytics);
        p.put("scalability", scalability);
        p.put("reliability", reliability);
        return Map.copyOf(p);
    }

    public List<Map<String, Object>> recommend(CloudRecommendationRequest request) {
        String workload = request.workload().trim();
        String traffic = request.traffic().trim().toLowerCase();
        String priority = request.priority().trim().toLowerCase();

        int trafficGb = switch (traffic) {
            case "low" -> 100;
            case "medium" -> 500;
            case "high" -> 2000;
            case "very high" -> 10000;
            default -> throw new IllegalArgumentException("Traffic must be Low, Medium, High, or Very High");
        };

        String workloadKey = workloadKey(workload);
        List<Map<String, Object>> results = new ArrayList<>();

        for (Map<String, Object> p : providers) {
            double cpuCost = request.cpu() * 0.03 * 730;
            double ramCost = request.ram() * 0.004 * 730;
            double storageCost = request.storage() * 0.02;
            double trafficCost = trafficGb * 0.05;
            double cost = round(((double) p.get("base")) + cpuCost + ramCost + storageCost + trafficCost);

            int workloadRating = (int) p.get(workloadKey);
            int scalabilityRating = (int) p.get("scalability");
            int reliabilityRating = (int) p.get("reliability");
            int resourceRating = Math.min(5, Math.max(1,
                    (int) Math.round((request.cpu() / 4.0 + request.ram() / 8.0) / 2.0)));

            int budgetPoints = cost <= request.budget() ? 30
                    : Math.max(0, 30 - (int) Math.ceil((cost - request.budget()) / Math.max(1, request.budget()) * 30));
            int workloadPoints = workloadRating * 5;
            int resourcePoints = resourceRating * 4;

            int priorityPoints = switch (priority) {
                case "lowest cost" -> Math.max(0, 25 - (int) Math.round(cost / 10));
                case "performance" -> workloadRating * 5;
                case "scalability" -> scalabilityRating * 5;
                case "reliability" -> reliabilityRating * 5;
                case "balanced" -> (workloadRating + scalabilityRating + reliabilityRating) * 25 / 15;
                default -> throw new IllegalArgumentException(
                        "Priority must be Balanced, Lowest Cost, Performance, Scalability, or Reliability");
            };

            int score = Math.min(100, budgetPoints + workloadPoints + resourcePoints + priorityPoints);
            String service = serviceFor(workload);
            String reason = reasonFor(workload, priority, cost <= request.budget(), workloadRating, scalabilityRating, reliabilityRating);
            String tradeoff = cost <= request.budget()
                    ? "Illustrative estimate fits the entered monthly budget; verify regional pricing and service limits."
                    : "Illustrative estimate is above the entered budget; consider reducing resources or comparing regions.";

            Map<String, Object> result = new LinkedHashMap<>();
            result.put("id", p.get("id"));
            result.put("provider", p.get("name"));
            result.put("service", service);
            result.put("workload", workload);
            result.put("score", score);
            result.put("monthly_cost", cost);
            result.put("currency", "USD");
            result.put("demo", true);
            result.put("reason", reason);
            result.put("description", reason);
            result.put("tradeoff", tradeoff);
            result.put("within_budget", cost <= request.budget());
            result.put("estimatedMonthlyCostUSD", cost);
            result.put("capabilities", Map.of(
                    "workload", workloadRating,
                    "scalability", scalabilityRating,
                    "reliability", reliabilityRating));
            results.add(result);
        }

        results.sort(Comparator.<Map<String, Object>>comparingInt(r -> (int) r.get("score"))
                .reversed().thenComparingDouble(r -> ((Number) r.get("monthly_cost")).doubleValue()));
        return results;
    }

    private String workloadKey(String workload) {
        return switch (workload.toLowerCase()) {
            case "web application", "mobile application", "development & testing" -> "web";
            case "machine learning" -> "ml";
            case "database" -> "database";
            case "data analytics" -> "analytics";
            case "storage & backup" -> "reliability";
            default -> throw new IllegalArgumentException("Unsupported workload type: " + workload);
        };
    }

    private String serviceFor(String workload) {
        return switch (workload.toLowerCase()) {
            case "machine learning" -> "AI / machine learning infrastructure";
            case "data analytics" -> "Data analytics and processing";
            case "database" -> "Managed database infrastructure";
            case "storage & backup" -> "Cloud object storage and backup";
            case "mobile application" -> "Application hosting and API infrastructure";
            case "development & testing" -> "Development and test environments";
            default -> "Cloud compute and application hosting";
        };
    }

    private String reasonFor(String workload, String priority, boolean withinBudget,
            int workloadRating, int scalability, int reliability) {
        return "Selected for " + workload + " with a demo workload-fit rating of " + workloadRating
                + "/5. " + (withinBudget ? "The estimate fits the entered budget. "
                : "The estimate is above the entered budget. ")
                + "Priority: " + priority + "; scalability rating " + scalability
                + "/5 and reliability rating " + reliability + "/5.";
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    // Legacy INR API retained for existing clients.
    public List<Map<String, Object>> recommend(double budget, int storage,
            String performance, String scalability) {
        List<Map<String, Object>> legacy = new ArrayList<>();
        int requiredPerformance = rating(performance);
        int requiredScalability = rating(scalability);
        for (Map<String, Object> p : providers) {
            double legacyBaseCost = switch (String.valueOf(p.get("id"))) {\n                case "aws" -> 1500;\n                case "azure" -> 1600;\n                case "gcp" -> 1400;\n                case "oci" -> 1350;\n                case "ibm" -> 1550;\n                case "digitalocean" -> 700;\n                case "linode" -> 750;\n                case "alibaba" -> 1200;\n                default -> 1500;\n            };\n            double cost = legacyBaseCost + storage * 2.0 + performanceSurcharge(performance);
            boolean withinBudget = cost <= budget;
            int performanceRating = (int) p.get("web");
            int scalabilityRating = (int) p.get("scalability");
            int score = (withinBudget ? 40 : 0)
                    + Math.max(0, 25 - Math.abs(performanceRating - requiredPerformance) * 10)
                    + Math.max(0, 25 - Math.abs(scalabilityRating - requiredScalability) * 10)
                    + Math.max(0, 10 - (int) (cost / 1000));
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("id", p.get("id"));
            item.put("provider", p.get("name"));
            item.put("estimatedMonthlyCostINR", cost);
            item.put("score", score);
            item.put("withinBudget", withinBudget);
            item.put("performanceRatingDemo", performanceRating);
            item.put("scalabilityRatingDemo", scalabilityRating);
            item.put("reasons", List.of("Legacy illustrative INR estimate"));
            legacy.add(item);
        }
        legacy.sort(Comparator.<Map<String, Object>>comparingInt(r -> (int) r.get("score"))
                .reversed().thenComparingDouble(r -> ((Number) r.get("estimatedMonthlyCostINR")).doubleValue()));
        return legacy;
    }

    private int rating(String level) {
        return switch (level.toLowerCase()) {
            case "low" -> 1;
            case "medium" -> 3;
            case "high" -> 5;
            default -> throw new IllegalArgumentException("Level must be low, medium, or high");
        };
    }

    private double performanceSurcharge(String performance) {
        return switch (performance.toLowerCase()) {
            case "low" -> 0;
            case "medium" -> 500;
            case "high" -> 1000;
            default -> throw new IllegalArgumentException("Performance must be low, medium, or high");
        };
    }
}
