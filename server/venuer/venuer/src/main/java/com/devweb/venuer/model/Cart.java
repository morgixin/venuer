package com.devweb.venuer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items;

    private Double total;

    @NotNull(message= "O 'Usuario' deve ser informado.")
    @ManyToOne
    private Usuario usuario;

    public Cart(Usuario usuario) {
        this.usuario = usuario;
    }
}

