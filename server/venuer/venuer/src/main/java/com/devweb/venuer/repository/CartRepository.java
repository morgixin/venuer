package com.devweb.venuer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.devweb.venuer.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUsuarioId(Long usuarioId);
}
