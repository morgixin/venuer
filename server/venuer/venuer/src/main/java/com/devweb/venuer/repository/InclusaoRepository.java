package com.devweb.venuer.repository;

import com.devweb.venuer.model.Inclusao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InclusaoRepository extends JpaRepository<Inclusao, Long> {
    @Query("select i from Inclusao i")
    List<Inclusao> recuperarInclusoes();

    Optional<Inclusao> findByTag(String tag);
}
