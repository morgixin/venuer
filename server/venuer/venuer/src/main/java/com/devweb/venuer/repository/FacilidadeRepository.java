package com.devweb.venuer.repository;

import com.devweb.venuer.model.Facilidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FacilidadeRepository extends JpaRepository<Facilidade, Long> {
    @Query("select f from Facilidade f")
    List<Facilidade> recuperarFacilidades();

    Optional<Facilidade> findByTag(String tag);
}
