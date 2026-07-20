package com.archana.ai_dashboard.service;

import com.archana.ai_dashboard.dto.ChartDataDTO;
import com.archana.ai_dashboard.dto.TeamPerformanceDTO;
import com.archana.ai_dashboard.entity.Order;
import com.archana.ai_dashboard.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.archana.ai_dashboard.dto.ActivityDTO;
import com.archana.ai_dashboard.dto.NotificationDTO;
import com.archana.ai_dashboard.dto.TaskDTO;
import com.archana.ai_dashboard.dto.MessageDTO;
import com.archana.ai_dashboard.dto.SearchDTO;
import com.archana.ai_dashboard.dto.SidebarDTO;
import com.archana.ai_dashboard.dto.ScheduleDTO;
import com.archana.ai_dashboard.entity.Schedule;
import com.archana.ai_dashboard.repository.ScheduleRepository;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    // Add Order
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    // Get All Orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Total Orders
    public long getTotalOrders() {
        return orderRepository.count();
    }

    // Total Revenue
    public double getRevenue() {

        return orderRepository.findAll()
                .stream()
                .mapToDouble(Order::getAmount)
                .sum();
    }

    // Delete Order
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    // Update Order
    public Order updateOrder(Long id, Order newOrder) {

        Order order = orderRepository.findById(id).orElseThrow();

        order.setCustomerName(newOrder.getCustomerName());
        order.setProductName(newOrder.getProductName());
        order.setAmount(newOrder.getAmount());
        order.setStatus(newOrder.getStatus());

        return orderRepository.save(order);
    }

    // Monthly Revenue
    public List<ChartDataDTO> getMonthlyRevenue() {

        List<Object[]> result = orderRepository.getMonthlyRevenue();

        return result.stream()
                .map(r -> new ChartDataDTO(
                        (String) r[0],
                        ((Number) r[1]).doubleValue()
                ))
                .toList();
    }

    // Team Performance
    public List<TeamPerformanceDTO> getTeamPerformance() {

        List<Object[]> result = orderRepository.getTeamPerformance();

        if (result.isEmpty()) {
            return List.of();
        }

        double max = ((Number) result.get(0)[1]).doubleValue();

        return result.stream()
                .map(r -> new TeamPerformanceDTO(
                        (String) r[0],
                        (int) ((((Number) r[1]).doubleValue() / max) * 100)
                ))
                .toList();
    }
    public List<ActivityDTO> getRecentActivities() {

        List<Object[]> result = orderRepository.getRecentActivities();

        return result.stream()
                .map(r -> new ActivityDTO(
                        r[0] + " placed an order",
                        "Just now"
                ))
                .toList();
    }
    public List<NotificationDTO> getNotifications() {

        List<Object[]> result = orderRepository.getNotifications();

        return result.stream()
                .map(r -> new NotificationDTO(
                        r[0] + " completed " + r[1] + " order",
                        "Just now"
                ))
                .toList();

    }
    public List<TaskDTO> getTasks() {

        return List.of(

                new TaskDTO("Complete Dashboard UI", true),
                new TaskDTO("Connect Spring Boot", true),
                new TaskDTO("Test REST APIs", false),
                new TaskDTO("Push Code to GitHub", true),
                new TaskDTO("Deploy Project", false)

        );

    }
    public List<MessageDTO> getMessages() {

        List<MessageDTO> messages = new ArrayList<>();

        messages.add(new MessageDTO(
                "Riya",
                "Placed a new laptop order",
                "2 min ago"
        ));

        messages.add(new MessageDTO(
                "Ritu",
                "Requested AI report",
                "8 min ago"
        ));

        messages.add(new MessageDTO(
                "Prachi",
                "Payment received successfully",
                "15 min ago"
        ));

        messages.add(new MessageDTO(
                "Om",
                "Dashboard updated",
                "30 min ago"
        ));

        return messages;
    }
    public List<SearchDTO> search(String keyword) {

        List<SearchDTO> results = new ArrayList<>();

        keyword = keyword.toLowerCase();

        for (Order order : orderRepository.findAll()) {

            if (order.getCustomerName().toLowerCase().contains(keyword)
                    || order.getProductName().toLowerCase().contains(keyword)) {

                results.add(new SearchDTO(
                        "Order",
                        order.getCustomerName(),
                        order.getProductName()
                ));

            }
        }

        return results;
    }
    public Order getOrderById(Long id){

        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order Not Found"));

    }
    public List<SidebarDTO> getSidebarMenu() {

        List<SidebarDTO> menu = new ArrayList<>();

        menu.add(new SidebarDTO(
                "Dashboard",
                "fa-solid fa-house",
                "#dashboard",
                true));

        menu.add(new SidebarDTO(
                "Analytics",
                "fa-solid fa-chart-pie",
                "#analytics",
                false));

        menu.add(new SidebarDTO(
                "Calendar",
                "fa-solid fa-calendar",
                "#calendar",
                false));

        menu.add(new SidebarDTO(
                "AI Assistant",
                "fa-solid fa-robot",
                "#assistant",
                false));

        menu.add(new SidebarDTO(
                "Messages",
                "fa-solid fa-message",
                "#messages",
                false));

        menu.add(new SidebarDTO(
                "Settings",
                "fa-solid fa-gear",
                "#settings",
                false));

        return menu;

    }
    public List<ScheduleDTO> getTodaySchedule() {

        return scheduleRepository.findAll()
                .stream()
                .map(schedule -> new ScheduleDTO(
                        schedule.getTime(),
                        schedule.getTitle()
                ))
                .toList();

    }

}