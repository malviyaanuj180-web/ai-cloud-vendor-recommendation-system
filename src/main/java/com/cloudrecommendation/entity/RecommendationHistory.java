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

    // Retained for records created by the legacy INR endpoint.
    private double estimatedMonthlyCostINR;

    @Column(length = 80)
    private String workload;

    private int cpu;
    private int ram;

    @Column(length = 20)
    private String traffic;

    @Column(length = 30)
    private String priority;

    @Column(length = 10)
    private String currency;

    private double estimatedMonthlyCostUSD;

    private LocalDateTime createdAt;

    public RecommendationHistory() {
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public double getBudget() { return budget; }
    public void setBudget(double budget) { this.budget = budget; }
    public int getStorage() { return storage; }
    public void setStorage(int storage) { this.storage = storage; }
    public String getPerformance() { return performance; }
    public void setPerformance(String performance) { this.performance = performance; }
    public String getScalability() { return scalability; }
    public void setScalability(String scalability) { this.scalability = scalability; }
    public String getRecommendedProvider() { return recommendedProvider; }
    public void setRecommendedProvider(String recommendedProvider) { this.recommendedProvider = recommendedProvider; }
    public double getEstimatedMonthlyCostINR() { return estimatedMonthlyCostINR; }
    public void setEstimatedMonthlyCostINR(double value) { this.estimatedMonthlyCostINR = value; }
    public String getWorkload() { return workload; }
    public void setWorkload(String workload) { this.workload = workload; }
    public int getCpu() { return cpu; }
    public void setCpu(int cpu) { this.cpu = cpu; }
    public int getRam() { return ram; }
    public void setRam(int ram) { this.ram = ram; }
    public String getTraffic() { return traffic; }
    public void setTraffic(String traffic) { this.traffic = traffic; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public double getEstimatedMonthlyCostUSD() { return estimatedMonthlyCostUSD; }
    public void setEstimatedMonthlyCostUSD(double value) { this.estimatedMonthlyCostUSD = value; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
