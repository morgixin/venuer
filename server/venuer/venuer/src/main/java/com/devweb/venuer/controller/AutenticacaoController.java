package com.devweb.venuer.controller;

import com.devweb.venuer.model.Usuario;
import com.devweb.venuer.service.AutenticacaoService;
import com.devweb.venuer.service.UserService;
import com.devweb.venuer.util.TokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("autenticacao")   // http://localhost:8080/autenticacao
public class AutenticacaoController {

    @Autowired
    private AutenticacaoService autenticacaoService;
    @Autowired
    private UserService userService;

    @PostMapping("/login")  // http://localhost:8080/autenticacao/login
    public Usuario login(@RequestBody Usuario usuario) {
        Usuario usuarioLogado = autenticacaoService.login(usuario);
        if (usuarioLogado != null) {
            return usuarioLogado;
        } else {
            return null;
        }
    }

    @GetMapping("logout")
    public TokenResponse logout() {
        return new TokenResponse("");
    }
}
