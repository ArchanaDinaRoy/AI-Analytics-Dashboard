package com.archana.ai_dashboard.dto;

public class ScheduleDTO {

    private String time;
    private String title;

    public ScheduleDTO() {
    }

    public ScheduleDTO(String time, String title) {
        this.time = time;
        this.title = title;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}