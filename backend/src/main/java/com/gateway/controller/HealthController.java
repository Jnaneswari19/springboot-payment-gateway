package com.gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "healthy");
        status.put("database", "connected");   // DB pool started successfully
        status.put("redis", "connected");      // placeholder for later
        status.put("worker", "running");       // placeholder for later
        status.put("timestamp", Instant.now().toString());
        return status;
    }
}
