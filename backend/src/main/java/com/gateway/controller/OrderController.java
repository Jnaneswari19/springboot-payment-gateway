package com.gateway.controller;

import com.gateway.entity.Order;
import com.gateway.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderRepository orderRepo;

    public OrderController(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    // ✅ Create a new order
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setId(UUID.randomUUID());
        order.setStatus("created");
        return orderRepo.save(order);
    }

    // ✅ Get all orders
    @GetMapping("/list")
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    // ✅ Get single order by ID
    @GetMapping("/{id}")
    public Order getOrder(@PathVariable UUID id) {
        return orderRepo.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Order not found: " + id));
    }
}
