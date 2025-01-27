package com.devweb.venuer.repository;

import com.devweb.venuer.model.Local;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface LocalRepository extends JpaRepository<Local, Long> {

        List<Local> findByValorDiaria(BigDecimal valorDiaria);

        @Lock(LockModeType.PESSIMISTIC_WRITE)
        @Query("select p from Local p where p.id = :id")
        Optional<Local> recuperarLocalPorIdComLock(@Param("id") Long id);

        @Query("select p from Local p left outer join fetch p.categoria order by p.id")
        List<Local> recuperarLocaisOrdenadosPorIdLocal();

        @Query("select p from Local p where p.categoria.id = :id")
        List<Local> recuperarLocaisPorIdCategoria(@Param("id") long id);

        @Query(value = "select p from Local p " +
                        "left outer join p.categoria " +
                        "where p.nome like %:nome%", countQuery = "select count(p) from Local p where p.nome like %:nome%")
        Page<Local> recuperarLocaisComPaginacao(@Param("nome") String nome, Pageable pageable);

        @Query("select p from Local p " +
                        "left outer join fetch p.categoria c " +
                        "where c.nome = :nome " +
                        "order by p.id")
        List<Local> recuperarLocaisPorNomeDaCategoria(@Param("nome") String nome);

        @Query(value = "select p from Local p " +
                        "left outer join fetch p.categoria c " +
                        "where c.nome = :nome " +
                        "order by p.nome", countQuery = "select count(p) " +
                                        "from Local p " +
                                        "left outer join p.categoria c " +
                                        "where c.nome = :nome ")
        Page<Local> recuperarLocaisPaginadosPorNomeDaCategoria(@Param("nome") String nome, Pageable pageable);

        @Query(value = "select p from Local p " +
                        "left outer join fetch p.categoria c " +
                        "order by p.nome", countQuery = "select count(p) from Local p ")
        Page<Local> recuperarLocaisPaginados(Pageable pageable);


}