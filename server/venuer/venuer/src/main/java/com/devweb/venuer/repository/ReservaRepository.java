package com.devweb.venuer.repository;

import com.devweb.venuer.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    @Query("select r from Reserva r")
    List<Reserva> recuperarReservas();

//    Optional<Reserva> findBy(String tag);
}
