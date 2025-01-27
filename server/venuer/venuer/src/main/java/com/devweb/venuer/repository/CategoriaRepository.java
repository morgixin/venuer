package com.devweb.venuer.repository;

import com.devweb.venuer.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("select c from Categoria c left outer join fetch c.locais where c.id = :id")
    Optional<Categoria> recuperarCategoriaComLocaisPorIdCategoria(@Param("id") long id);

    @Query("select nome from Categoria")
    List<Categoria> recuperarCategorias(@Param("id") long id);

    @Query("select c.nome from Categoria c where c.id = :id")
    Categoria recuperarNomeCategoriaPorId(@Param("id") long id);

    Optional<Categoria> findByNome(String nome);
}