package com.archana.ai_dashboard.repository;

import com.archana.ai_dashboard.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = """
            SELECT
                MONTHNAME(order_date) AS month,
                SUM(amount) AS revenue
            FROM orders
            GROUP BY MONTH(order_date), MONTHNAME(order_date)
            ORDER BY MONTH(order_date)
            """, nativeQuery = true)
    List<Object[]> getMonthlyRevenue();


    @Query(value = """
            SELECT
                customer_name,
                SUM(amount)
            FROM orders
            GROUP BY customer_name
            ORDER BY SUM(amount) DESC
            """, nativeQuery = true)
    List<Object[]> getTeamPerformance();

    @Query(value = """
SELECT
customer_name,
status
FROM orders
ORDER BY id DESC
LIMIT 5
""", nativeQuery = true)
    List<Object[]> getRecentActivities();

    @Query(value = """
SELECT
customer_name,
product_name,
status
FROM orders
ORDER BY id DESC
LIMIT 5
""", nativeQuery = true)
    List<Object[]> getNotifications();

}