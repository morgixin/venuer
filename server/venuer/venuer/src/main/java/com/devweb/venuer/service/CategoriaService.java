package com.devweb.venuer.service;

import com.devweb.venuer.exception.EntidadeNaoEncontradaException;
import com.devweb.venuer.model.Categoria;
import com.devweb.venuer.model.CategoriaDTO;
import com.devweb.venuer.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;
    public CategoriaDTO recuperarCategoriaComLocaisPorIdCategoria(long id) {
//        Categoria umaCategoria = categoriaRepository.findById(id)
//                .orElseThrow(() -> new EntidadeNaoEncontradaException(
//                        "Categoria número " + id + " não encontrada."));
        Categoria umaCategoria = categoriaRepository.recuperarCategoriaComLocaisPorIdCategoria(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Categoria número " + id + " não encontrada."));
        return new CategoriaDTO(umaCategoria.getNome(), umaCategoria.getLocais());
    }

    public List<Categoria> recuperarCategorias() {
        return categoriaRepository.findAll();
    }
}
