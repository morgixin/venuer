package com.devweb.venuer.controller;

import com.devweb.venuer.model.Categoria;
import com.devweb.venuer.model.CategoriaDTO;
import com.devweb.venuer.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//@CrossOrigin(FRONTEND_URL)
@RestController
@RequestMapping("categorias")   // http://localhost:8080/categorias
public class CategoriaController {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping ("{idCategoria}/produtos")   // http://localhost:8080/categorias/1/produtos
    public CategoriaDTO recuperarCategoriaComLocaisPorIdCategoria(@PathVariable("idCategoria") long id) {
        return categoriaService.recuperarCategoriaComLocaisPorIdCategoria(id);
    }

    @GetMapping()
    public List<Categoria> recuperarCategorias() {
        return categoriaService.recuperarCategorias();
    }
}
