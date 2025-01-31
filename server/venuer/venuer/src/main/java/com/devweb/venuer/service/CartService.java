package com.devweb.venuer.service;

import com.devweb.venuer.model.Cart;
import com.devweb.venuer.model.CartItem;
import com.devweb.venuer.model.Local;
import com.devweb.venuer.model.Usuario;
import com.devweb.venuer.repository.CartItemRepository;
import com.devweb.venuer.repository.CartRepository;
import com.devweb.venuer.repository.LocalRepository;
import com.devweb.venuer.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final LocalRepository localRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public Cart addToCart(Long usuarioId, Long localId, int quantity) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario not found"));
        Local local = localRepository.findById(localId)
                .orElseThrow(() -> new RuntimeException("Local not found"));

        Cart cart = cartRepository.findByUsuarioId(usuarioId);
        if (cart == null) {
            cart = new Cart(usuario);
        }

        CartItem cartItem = new CartItem(cart, local, quantity);
        cart.getItems().add(cartItem);

        cartRepository.save(cart);
        return cart;
    }

    public Cart getCartByUsuarioId(Long usuarioId) {
        return cartRepository.findByUsuarioId(usuarioId);
    }
}