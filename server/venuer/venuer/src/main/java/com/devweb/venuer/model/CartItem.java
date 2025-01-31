package com.devweb.venuer.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Cart cart;

    @ManyToOne
    private Local local;

    private int quantity;

    public CartItem(Cart cart, Local local, int quantity) {
        this.cart = cart;
        this.local = local;
        this.quantity = quantity;
    }
}