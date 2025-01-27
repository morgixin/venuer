package com.devweb.venuer.service;

import com.devweb.venuer.model.Usuario;
import com.devweb.venuer.repository.UsuarioRepository;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AutenticacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario login(Usuario usuario) {
        System.out.println("Email = " + usuario.getEmail() + " e senha = " + usuario.getPassword());
        return usuarioRepository.findByEmailAndPassword(
                usuario.getEmail(), usuario.getPassword());
    }

}

