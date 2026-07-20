package com.archana.ai_dashboard.controller;

import com.archana.ai_dashboard.dto.DashboardDTO;
import com.archana.ai_dashboard.dto.TeamPerformanceDTO;
import com.archana.ai_dashboard.repository.UserRepository;
import com.archana.ai_dashboard.service.OrderService;
import com.archana.ai_dashboard.dto.AIInsightsDTO;
import com.archana.ai_dashboard.dto.NotificationDTO;
import com.archana.ai_dashboard.dto.TaskDTO;
import com.archana.ai_dashboard.dto.MessageDTO;
import com.archana.ai_dashboard.dto.SearchDTO;
import com.archana.ai_dashboard.dto.SidebarDTO;
import com.archana.ai_dashboard.dto.ScheduleDTO;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.archana.ai_dashboard.dto.ActivityDTO;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderService orderService;

    @GetMapping
    public DashboardDTO getDashboard() {

        DashboardDTO dto = new DashboardDTO();

        dto.setTotalUsers((int) userRepository.count());
        dto.setTotalOrders((int) orderService.getTotalOrders());
        dto.setRevenue(orderService.getRevenue());
        dto.setProfit(orderService.getRevenue() * 0.30);

        return dto;
    }

    @GetMapping("/team-performance")
    public List<TeamPerformanceDTO> getTeamPerformance() {

        return orderService.getTeamPerformance();
    }

    @GetMapping("/ai-insights")
    public AIInsightsDTO getAIInsights() {

        int confidence = 96;
        int accuracy = 98;
        double responseTime = 1.2;

        return new AIInsightsDTO(
                confidence,
                accuracy,
                responseTime
        );
    }

    @GetMapping("/recent-activity")
    public List<ActivityDTO> getRecentActivities() {
        return orderService.getRecentActivities();
    }
    @GetMapping("/notifications")
    public List<NotificationDTO> getNotifications() {
        return orderService.getNotifications();
    }
    @GetMapping("/tasks")
    public List<TaskDTO> getTasks() {

        return orderService.getTasks();

    }
    @GetMapping("/messages")
    public List<MessageDTO> getMessages() {
        return orderService.getMessages();
    }
    @GetMapping("/search")
    public List<SearchDTO> search(
            @RequestParam String keyword) {

        return orderService.search(keyword);
    }
    @GetMapping("/sidebar")
    public List<SidebarDTO> getSidebarMenu() {

        return orderService.getSidebarMenu();

    }
    @GetMapping("/schedule")
    public List<ScheduleDTO> getTodaySchedule(){

        return orderService.getTodaySchedule();

    }
}
