
package com.cloudrecommendation.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendation_history")
public class RecommendationHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double budget;
    private int storage;

    @Column(length = 20)
    private String performance;

    @Column(length = 20)
    private String scalability;

    @Column(length = 100)
    private String recommendedProvider;

    private double estimatedMonthlyCostINR;

    private LocalDateTime createdAt;

    public RecommendationHistory() {
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }

    public int getStorage() {
        return storage;
    }

    public void setStorage(int storage) {
        this.storage = storage;
    }

    public String getPerformance() {
        return performance;
    }

    public void setPerformance(String performance) {
        this.performance = performance;
    }

    public String getScalability() {
        return scalability;
    }

    public void setScalability(String scalability) {
        this.scalability = scalability;
    }

    public String getRecommendedProvider() {
        return recommendedProvider;
    }

    public void setRecommendedProvider(String recommendedProvider) {
        this.recommendedProvider = recommendedProvider;
    }

    public double getEstimatedMonthlyCostINR() {
        return estimatedMonthlyCostINR;
    }

    public void setEstimatedMonthlyCostINR(double estimatedMonthlyCostINR) {
        this.estimatedMonthlyCostINR = estimatedMonthlyCostINR;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
