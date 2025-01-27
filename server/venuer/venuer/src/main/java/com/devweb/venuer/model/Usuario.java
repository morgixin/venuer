package com.devweb.venuer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.UniqueElements;

import java.math.BigInteger;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "O 'Username' deve ser informado.")
    @Column(unique=true)
    private String username;

    @NotEmpty(message = "O 'Nome' deve ser informado.")
    private String name;
    @NotEmpty(message = "O 'Sobrenome' deve ser informado.")
    private String surname;
    @NotEmpty(message = "O 'E-mail' deve ser informado.")
    private String email;
    private String phoneNumber;
    @NotEmpty(message = "A 'Senha' deve ser informada.")
    private String password;

    public Usuario(String username, String name, String surname, String email, String phoneNumber, String password) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}
