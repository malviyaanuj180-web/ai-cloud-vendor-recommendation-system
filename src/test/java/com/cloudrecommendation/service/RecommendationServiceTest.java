package com.cloudrecommendation.service;

import com.cloudrecommendation.dto.CloudRecommendationRequest;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class RecommendationServiceTest {

    private final RecommendationService service = new RecommendationService();

    @Test
    void returnsEightProvidersWithFrontendFields() {
        CloudRecommendationRequest request = new CloudRecommendationRequest(
                "Web Application", 500, 4, 8, 100, "Medium", "Balanced");

        List<Map<String, Object>> results = service.recommend(request);

        assertEquals(8, results.size());
        assertTrue(results.get(0).containsKey("provider"));
        assertTrue(results.get(0).containsKey("service"));
        assertTrue(results.get(0).containsKey("score"));
        assertTrue(results.get(0).containsKey("monthly_cost"));
        assertEquals("USD", results.get(0).get("currency"));
        assertEquals(true, results.get(0).get("demo"));
    }

    @Test
    void supportsEveryWorkloadType() {
        List<String> workloads = List.of(
                "Web Application", "Mobile Application", "Machine Learning",
                "Data Analytics", "Database", "Development & Testing", "Storage & Backup");

        for (String workload : workloads) {
            CloudRecommendationRequest request = new CloudRecommendationRequest(
                    workload, 1000, 4, 8, 100, "Low", "Balanced");
            assertEquals(8, service.recommend(request).size(), workload);
        }
    }

    @Test
    void priorityChangesRankingOrScores() {
        CloudRecommendationRequest balanced = new CloudRecommendationRequest(
                "Machine Learning", 1000, 8, 16, 500, "High", "Balanced");
        CloudRecommendationRequest lowestCost = new CloudRecommendationRequest(
                "Machine Learning", 1000, 8, 16, 500, "High", "Lowest Cost");

        List<Map<String, Object>> first = service.recommend(balanced);
        List<Map<String, Object>> second = service.recommend(lowestCost);

        assertNotEquals(first.get(0).get("score"), second.get(0).get("score"));
    }
}
