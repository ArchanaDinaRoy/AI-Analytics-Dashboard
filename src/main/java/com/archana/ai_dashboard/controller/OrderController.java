package com.archana.ai_dashboard.controller;

import com.archana.ai_dashboard.entity.Order;
import com.archana.ai_dashboard.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.archana.ai_dashboard.dto.ChartDataDTO;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Add Order
    @PostMapping
    public Order addOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    // Get All Orders
    @GetMapping
    public List<Order> getOrders() {
        return orderService.getAllOrders();
    }
    // Get Order By ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {

        return orderService.getOrderById(id);

    }
    // Delete Order
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {

        orderService.deleteOrder(id);

        return "Order Deleted Successfully";
    }
    // Update Order
    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id,
                             @RequestBody Order order) {

        return orderService.updateOrder(id, order);
    }
    @GetMapping("/chart")
    public List<ChartDataDTO> getChartData() {

        List<ChartDataDTO> data = orderService.getMonthlyRevenue();

        System.out.println(data);

        return data;
    }

}
