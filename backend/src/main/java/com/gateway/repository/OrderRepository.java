package com.gateway.repository;

import com.gateway.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByMerchantId(UUID merchantId);
    Page<Order> findByMerchantId(UUID merchantId, Pageable pageable);
}
