package com.devweb.venuer.service;

import com.devweb.venuer.exception.EntidadeNaoEncontradaException;
import com.devweb.venuer.model.Usuario;
import com.devweb.venuer.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = usuarioRepository.findByUsername(username);
        if (user != null) {
            return User.builder()
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .build();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }

    public Usuario getUserById(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.orElse(null);
    }

    public Usuario getUserByEmail(String email) {
        Optional<Usuario> usuario = Optional.ofNullable(usuarioRepository.findByEmail(email));
        return usuario.orElse(null);
    }

    public Usuario updateUser(Usuario usuario) {
        if (usuarioRepository.existsById(usuario.getId())) {
            return usuarioRepository.save(usuario);
        } else {
            throw new EntidadeNaoEncontradaException("Usuário não encontrado com o ID: " + usuario.getId());
        }
    }
}
