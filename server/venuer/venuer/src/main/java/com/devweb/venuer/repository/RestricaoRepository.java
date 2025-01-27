package com.devweb.venuer.repository;

import com.devweb.venuer.model.Categoria;
import com.devweb.venuer.model.Restricao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RestricaoRepository extends JpaRepository<Restricao, Long>{
    @Query("select r from Restricao r")
    List<Restricao> recuperarRestricoes();

    Optional<Restricao> findByTag(String tag);
}
