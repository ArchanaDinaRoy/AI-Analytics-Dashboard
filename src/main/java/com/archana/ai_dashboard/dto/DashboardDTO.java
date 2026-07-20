package com.archana.ai_dashboard.dto;

public class DashboardDTO {

    private int totalUsers;
    private int totalOrders;
    private double revenue;
    private double profit;

    public DashboardDTO() {
    }

    public DashboardDTO(int totalUsers, int totalOrders, double revenue, double profit) {
        this.totalUsers = totalUsers;
        this.totalOrders = totalOrders;
        this.revenue = revenue;
        this.profit = profit;
    }

    public int getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(int totalUsers) {
        this.totalUsers = totalUsers;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(int totalOrders) {
        this.totalOrders = totalOrders;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }

    public double getProfit() {
        return profit;
    }

    public void setProfit(double profit) {
        this.profit = profit;
    }
}