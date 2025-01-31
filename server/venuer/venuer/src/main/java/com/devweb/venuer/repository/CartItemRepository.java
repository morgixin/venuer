package com.devweb.venuer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.devweb.venuer.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}