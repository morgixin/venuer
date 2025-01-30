package com.devweb.venuer.service;

import com.devweb.venuer.exception.EntidadeNaoEncontradaException;
import com.devweb.venuer.model.*;
import com.devweb.venuer.repository.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
//import com.devweb.venuer.model.Facilidade;
//import com.devweb.venuer.model.Inclusao;
//import com.devweb.venuer.model.Reserva;
//import com.devweb.venuer.model.Restricao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class LocalService {

    @Autowired
    private LocalRepository localRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private FacilidadeRepository facilidadeRepository;
    @Autowired
    private RestricaoRepository restricaoRepository;
    @Autowired
    private InclusaoRepository inclusaoRepository;
    @Autowired
    private ReservaRepository reservaRepository;

    public List<Local> recuperarLocais() {
        return localRepository.recuperarLocaisOrdenadosPorIdLocal();
    }

    @Transactional
    public Local cadastrarLocal(Local local) {
        // Fetch and set existing categoria
        Categoria categoria = categoriaRepository.findById(local.getCategoria().getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Categoria número " + local.getCategoria().getId() + " não encontrada."));
        local.setCategoria(categoria);

        // Fetch and set existing inclusoes
        List<Inclusao> inclusoes = local.getInclusoes() != null ?
                    local.getInclusoes().stream()
                        .map(inclusao -> inclusaoRepository.findById(inclusao.getId())
                         .orElseThrow(() -> new EntidadeNaoEncontradaException(
                                    "Inclusao número " + inclusao.getId() + " não encontrada.")))
                        .collect(Collectors.toList())
                : Collections.emptyList();
        local.setInclusoes(inclusoes);

        // Fetch and set existing restricoes
        List<Restricao> restricoes = local.getRestricoes() != null ? local.getRestricoes().stream()
                .map(restricao -> restricaoRepository.findById(restricao.getId())
                        .orElseThrow(() -> new EntidadeNaoEncontradaException(
                                "Restricao número " + restricao.getId() + " não encontrada.")))
                .collect(Collectors.toList()) : Collections.emptyList();
        local.setRestricoes(restricoes);

        // Fetch and set existing facilidades
        List<Facilidade> facilidades = local.getFacilidades() != null ? local.getFacilidades().stream()
                .map(facilidade -> facilidadeRepository.findById(facilidade.getId())
                        .orElseThrow(() -> new EntidadeNaoEncontradaException(
                                "Facilidade número " + facilidade.getId() + " não encontrada.")))
                .collect(Collectors.toList()) : Collections.emptyList();
        local.setFacilidades(facilidades);

        local.setReservas(Collections.emptyList());

        return localRepository.save(local);
    }


    @Transactional
    public Local alterarLocal(Local local) {
        Local existingLocal = localRepository.recuperarLocalPorIdComLock(local.getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Local número " + local.getId() + " não encontrado."));

        // Fetch and set existing categoria
        Categoria categoria = categoriaRepository.findById(local.getCategoria().getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Categoria número " + local.getCategoria().getId() + " não encontrada."));
        existingLocal.setCategoria(categoria);

        // Fetch and set existing inclusoes
        List<Inclusao> inclusoes = local.getInclusoes().stream()
                .map(inclusao -> inclusaoRepository.findById(inclusao.getId())
                        .orElseThrow(() -> new EntidadeNaoEncontradaException(
                                "Inclusao número " + inclusao.getId() + " não encontrada.")))
                .collect(Collectors.toList());
        existingLocal.setInclusoes(inclusoes);

        // Fetch and set existing restricoes
        List<Restricao> restricoes = local.getRestricoes().stream()
                .map(restricao -> restricaoRepository.findById(restricao.getId())
                        .orElseThrow(() -> new EntidadeNaoEncontradaException(
                                "Restricao número " + restricao.getId() + " não encontrada.")))
                .collect(Collectors.toList());
        existingLocal.setRestricoes(restricoes);

        // Fetch and set existing facilidades
        List<Facilidade> facilidades = local.getFacilidades().stream()
                .map(facilidade -> facilidadeRepository.findById(facilidade.getId())
                        .orElseThrow(() -> new EntidadeNaoEncontradaException(
                                "Facilidade número " + facilidade.getId() + " não encontrada.")))
                .collect(Collectors.toList());
        existingLocal.setFacilidades(facilidades);

        List<Reserva> reservas = local.getReservas().stream()
                .map(reserva -> {
                        if (reserva.getId() == null) {
                                return reservaRepository.save(reserva);
                        } else {
                                return reservaRepository.findById(reserva.getId())
                                        .orElseThrow(() -> new EntidadeNaoEncontradaException(
                                                "Reserva número " + reserva.getId() + " não encontrada."));
                        }
                }).collect(Collectors.toList());

        // Update other fields
        existingLocal.setImagem(local.getImagem());
        existingLocal.setNome(local.getNome());
        existingLocal.setDescricao(local.getDescricao());
        existingLocal.setDisponivel(local.isDisponivel());
        existingLocal.setQtdMinimaPessoas(local.getQtdMinimaPessoas());
        existingLocal.setQtdMaximaPessoas(local.getQtdMaximaPessoas());
        existingLocal.setQtdBanheiros(local.getQtdBanheiros());
        existingLocal.setQtdAndares(local.getQtdAndares());
        existingLocal.setValorDiaria(local.getValorDiaria());
        existingLocal.setValorHora(local.getValorHora());
        existingLocal.setValorPessoa(local.getValorPessoa());
        existingLocal.setEndereco(local.getEndereco());
        existingLocal.setCidade(local.getCidade());
        existingLocal.setEstado(local.getEstado());
        existingLocal.setCep(local.getCep());
        existingLocal.setDataCadastro(local.getDataCadastro());
        existingLocal.setReservas(reservas);
        existingLocal.setUsuario(local.getUsuario());

        return localRepository.save(existingLocal);
    }

    public void removerLocal(long id) {
        recuperarLocalPorId(id);
        localRepository.deleteById(id);
    }

    public Local recuperarLocalPorId(long id) {
        return localRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Local número " + id + " não encontrado."));
    }

    public List<Local> recuperarLocaisPorIdCategoria(long id) {
        categoriaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Categoria número " + id + " não encontrada."));
        return localRepository.recuperarLocaisPorIdCategoria(id);
    }

    public Page<Local> recuperarLocaisComPaginacao(Pageable pageable, String nome, Long usuarioId) {
        return localRepository.recuperarLocaisComPaginacao(nome, usuarioId, pageable);
    }
    public List<Local> recuperarLocaisPorNomeDaCategoria(String nome) {
        return localRepository.recuperarLocaisPorNomeDaCategoria(nome);
    }

    public Page<Local> recuperarLocaisPaginadosPorNomeDaCategoria(String nome, Pageable pageable) {
        if(!nome.isEmpty()) {
            return localRepository.recuperarLocaisPaginadosPorNomeDaCategoria(nome, pageable);
        }
        else {
            return localRepository.recuperarLocaisPaginados(pageable);
        }
    }
}