package com.devweb.venuer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Local {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "A 'Imagem' deve ser informada.")
    private String imagem;

    @NotEmpty(message = "O 'Nome' deve ser informado.")
    private String nome;

    @NotEmpty(message = "A 'Descrição' deve ser informada.")
    private String descricao;

    @NotNull(message = "A 'Disponibilidade' deve ser informada.")
    private boolean disponivel;

    @NotNull(message = "O 'Dono' deve ser informado.")
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // opcionais
    private int qtdMinimaPessoas;
    private int qtdMaximaPessoas;
    private int qtdBanheiros;
    private int qtdAndares;

    @NotNull(message = "O 'Preço' deve ser informado.")
    private BigDecimal valorDiaria;
    private BigDecimal valorHora;
    private BigDecimal valorPessoa;

    @NotNull(message = "O 'Endereco' deve ser informado.")
    private String endereco;
    @NotNull(message = "A 'Cidade' deve ser informada.")
    private String cidade;
    @NotNull(message = "O 'Estado' deve ser informado.")
    private String estado;
    @NotNull(message = "O 'CEP' deve ser informado.")
    private String cep;

    // opcionais -- tags do lugar
    @ManyToMany
    private List<Restricao> restricoes;
    @ManyToMany
    private List<Inclusao> inclusoes;
    @ManyToMany
    private List<Facilidade> facilidades; // qualidades do local
    @ManyToMany
    private List<Reserva> reservas; // lista de reservas -- inicialmente vazia, altera e incrementa

    @Column(name = "DATA_CADASTRO") // será automatico
    private LocalDate dataCadastro;

    @NotNull(message = "A 'Categoria' deve ser informada.")
//    @ColumnDefault("Espaço")
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    public Local(String imagem,
                 String nome,
                 String descricao,
                 boolean disponivel,
                 int qtdMinimaPessoas,
                 int qtdMaximaPessoas,
                 int qtdBanheiros,
                 int qtdAndares,
                 BigDecimal valorDiaria,
                 BigDecimal valorHora,
                 BigDecimal valorPessoa,
                 String endereco,
                 String cidade,
                 String estado,
                 String cep,
                 LocalDate dataCadastro,
                 Categoria categoria,
                 Usuario usuario) {
        this.imagem = imagem;
        this.nome = nome;
        this.descricao = descricao;
        this.disponivel = disponivel;
        this.qtdMinimaPessoas = qtdMinimaPessoas;
        this.qtdMaximaPessoas = qtdMaximaPessoas;
        this.qtdBanheiros = qtdBanheiros;
        this.qtdAndares = qtdAndares;
        this.valorDiaria = valorDiaria;
        this.valorHora = valorHora;
        this.valorPessoa = valorPessoa;
        this.endereco = endereco;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.dataCadastro = dataCadastro;
        this.categoria = categoria;
        this.usuario = usuario;
    }
}


