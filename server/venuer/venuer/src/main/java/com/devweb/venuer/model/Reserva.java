package com.devweb.venuer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "A 'Data de Início' deve ser informada.")
    private LocalDate dataInicio;

    @NotNull(message = "A 'Data de Fim' deve ser informada.")
    private LocalDate dataFim;

    @NotNull(message= "O 'Usuario' deve ser informado.")
    @ManyToOne
    private Usuario usuario;

    public Reserva(LocalDate dataInicio, LocalDate dataFim, Local local, Usuario usuario) {
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.usuario = usuario;
    }
}
