package com.devweb.venuer.repository;

import com.devweb.venuer.model.Usuario;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.jpa.repository.JpaRepository;

// <User --> tipo da entidade
// , Long> --> tipo da PK
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByEmailAndPassword(String email, String pass);

    Usuario findByEmail(String email);

    Usuario findByUsername(String username);
}
