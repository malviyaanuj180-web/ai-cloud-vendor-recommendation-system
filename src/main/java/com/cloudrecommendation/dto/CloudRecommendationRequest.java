package com.cloudrecommendation.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CloudRecommendationRequest(
        @NotBlank String workload,
        @DecimalMin(value = "1.0", message = "Budget must be greater than zero") double budget,
        @Min(1) @Max(256) int cpu,
        @Min(1) @Max(4096) int ram,
        @Min(1) @Max(100000) int storage,
        @NotBlank String traffic,
        @NotBlank String priority) {
}
