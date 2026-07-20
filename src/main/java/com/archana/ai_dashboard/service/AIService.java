package com.archana.ai_dashboard.service;

import com.archana.ai_dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderService orderService;

    public String getReply(String message) {

        message = message.toLowerCase();

        if (message.contains("revenue")) {
            return "Your total revenue is ₹" + orderService.getRevenue();
        }

        if (message.contains("orders")) {
            return "There are " + orderService.getTotalOrders() + " orders.";
        }

        if (message.contains("users")) {
            return "There are " + userRepository.count() + " users.";
        }

        if (message.contains("profit")) {
            return "Your profit is ₹" + (orderService.getRevenue() * 0.30);
        }

        return "Sorry, I don't understand your question.";
    }
}