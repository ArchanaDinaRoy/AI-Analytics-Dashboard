package com.archana.ai_dashboard.dto;

public class SidebarDTO {

    private String title;
    private String icon;
    private String link;
    private boolean active;

    public SidebarDTO() {
    }

    public SidebarDTO(String title, String icon, String link, boolean active) {
        this.title = title;
        this.icon = icon;
        this.link = link;
        this.active = active;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}