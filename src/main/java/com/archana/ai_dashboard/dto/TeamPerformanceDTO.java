package com.archana.ai_dashboard.dto;

public class TeamPerformanceDTO {

    private String name;
    private int performance;

    public TeamPerformanceDTO() {
    }

    public TeamPerformanceDTO(String name, int performance) {
        this.name = name;
        this.performance = performance;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPerformance() {
        return performance;
    }

    public void setPerformance(int performance) {
        this.performance = performance;
    }
}