package com.archana.ai_dashboard.dto;

public class AIInsightsDTO {

    private int confidence;
    private int accuracy;
    private double responseTime;

    public AIInsightsDTO() {
    }

    public AIInsightsDTO(int confidence, int accuracy, double responseTime) {
        this.confidence = confidence;
        this.accuracy = accuracy;
        this.responseTime = responseTime;
    }

    public int getConfidence() {
        return confidence;
    }

    public void setConfidence(int confidence) {
        this.confidence = confidence;
    }

    public int getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(int accuracy) {
        this.accuracy = accuracy;
    }

    public double getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(double responseTime) {
        this.responseTime = responseTime;
    }
}