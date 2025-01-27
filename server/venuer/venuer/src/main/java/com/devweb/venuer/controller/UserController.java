package com.devweb.venuer.controller;

import com.devweb.venuer.model.Usuario;
import com.devweb.venuer.service.UserService;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("{idUsuario}")   // http://localhost:8080/categorias/1/produtos
    public Usuario findUserById(@PathVariable("idUsuario") Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("email/{email}")   // http://localhost:8080/categorias/1/produtos
    public Usuario findUserByEmail(@PathVariable("email") String email) {
        return userService.getUserByEmail(email);
    }

    @PutMapping
    public Usuario updateUser(@RequestBody Usuario user) {
        return userService.updateUser(user);
    }

}
