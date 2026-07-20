package com.archana.ai_dashboard.dto;

public class ActivityDTO {

    private String title;
    private String time;

    public ActivityDTO() {
    }

    public ActivityDTO(String title, String time) {
        this.title = title;
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}