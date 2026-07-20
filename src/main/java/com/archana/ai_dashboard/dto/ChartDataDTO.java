package com.archana.ai_dashboard.dto;

public class ChartDataDTO {

    private String month;
    private Double revenue;

    public ChartDataDTO() {
    }

    public ChartDataDTO(String month, Double revenue) {
        this.month = month;
        this.revenue = revenue;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }
}