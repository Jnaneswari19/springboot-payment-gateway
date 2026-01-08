package com.gateway.controller;

import com.gateway.entity.Order;
import com.gateway.entity.Payment;
import com.gateway.repository.OrderRepository;
import com.gateway.repository.PaymentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentRepository paymentRepo;
    private final OrderRepository orderRepo;
    private final Random random = new Random();

    public PaymentController(PaymentRepository paymentRepo, OrderRepository orderRepo) {
        this.paymentRepo = paymentRepo;
        this.orderRepo = orderRepo;
    }

    // ✅ Health check endpoint
    @GetMapping("/ping")
    public String ping() {
        return "API is alive!";
    }

    // ✅ Create a new payment
    @PostMapping
    public Payment createPayment(@RequestBody Map<String, String> payload) {
        UUID orderId = UUID.fromString(payload.get("orderId"));
        String method = payload.get("method");

        Optional<Order> orderOpt = orderRepo.findById(orderId);
        if (orderOpt.isEmpty()) {
            throw new IllegalArgumentException("Order not found: " + orderId);
        }

        Order order = orderOpt.get();

        Payment payment = new Payment();
        payment.setId(UUID.randomUUID());
        payment.setOrder(order);
        payment.setMerchantId(order.getMerchantId()); // ✅ ensure merchantId is set
        payment.setAmount(order.getAmount());
        payment.setMethod(method);

        int chance = random.nextInt(100);
        if ("UPI".equalsIgnoreCase(method)) {
            payment.setStatus(chance < 80 ? "success" : "failed");
        } else if ("CARD".equalsIgnoreCase(method)) {
            payment.setStatus(chance < 70 ? "success" : "failed");
        } else {
            payment.setStatus(chance < 60 ? "success" : "failed");
        }

        if ("success".equals(payment.getStatus())) {
            order.setStatus("paid");
            orderRepo.save(order);
        }

        return paymentRepo.save(payment);
    }

    // ✅ Get a single payment by ID
    @GetMapping("/{id}")
    public Payment getPayment(@PathVariable UUID id) {
        return paymentRepo.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Payment not found: " + id));
    }

    // ✅ Get payments by order ID
    @GetMapping("/order/{orderId}")
    public List<Payment> getPaymentsByOrder(@PathVariable UUID orderId) {
        return paymentRepo.findByOrder_Id(orderId);
    }

    // ✅ Get all payments (for dashboard transactions table)
    @GetMapping("/list")
    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }
}
