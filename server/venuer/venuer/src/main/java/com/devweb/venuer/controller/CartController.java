package com.devweb.venuer.controller;

import com.devweb.venuer.model.Cart;
import com.devweb.venuer.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("cart")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody Long usuarioId, @RequestBody Long localId, @RequestBody int quantity) {
        return cartService.addToCart(usuarioId, localId, quantity);
    }

    @GetMapping("/{usuarioId}")
    public Cart getCart(@PathVariable Long usuarioId) {
        return cartService.getCartByUsuarioId(usuarioId);
    }

//    @DeleteMapping("/remove")
//    public void removeFromCart(@PathVariable Long usuarioId) {
//        return cartService.removeFromCart()
//    }
}