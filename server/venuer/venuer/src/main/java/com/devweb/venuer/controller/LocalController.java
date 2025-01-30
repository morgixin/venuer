package com.devweb.venuer.controller;

import com.devweb.venuer.model.Local;
import com.devweb.venuer.model.ResultadoPaginado;
import com.devweb.venuer.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("locais")    // http://localhost:8080/locais
public class LocalController {

    @Autowired
    private LocalService localService;

    @GetMapping    // GET para http://localhost:8080/locais
    public ResponseEntity<List<Local>> recuperarLocais() {
        return new ResponseEntity<>(localService.recuperarLocais(), HttpStatus.OK);
    }

    @GetMapping("categoria/{nomeCategoria}")    // GET para http://localhost:8080/produtos/categoria/1
    public List<Local> recuperarLocaisPorNomeDaCategoria(@PathVariable("nomeCategoria") String nome) {
        return localService.recuperarLocaisPorNomeDaCategoria(nome);
    }

    @GetMapping("{idLocal}")    // GET para http://localhost:8080/produtos/1
    public Local recuperarLocal(@PathVariable("idLocal") long id) {
        return localService.recuperarLocalPorId(id);
    }

//    @GetMapping    // GET para http://localhost:8080/produtos
//    public List<Local> recuperarLocais() {
//        return produtoService.recuperarLocais();
//    }

    @PostMapping
    public Local cadastrarLocal(@RequestBody Local local) {
        return localService.cadastrarLocal(local);
    }

    @PutMapping
    public Local alterarLocal(@RequestBody Local local) {
        return localService.alterarLocal(local);
    }

    // Requisição do tipo DELETE para http://localhost:8080/produto/2
    @DeleteMapping("{idLocal}")
    public void removerLocal(@PathVariable("idLocal") long id) {
        localService.removerLocal(id);
    }

    // http://localhost:8080/produtos/paginacao?pagina=0&tamanho=5
    @GetMapping("paginacao")
    public ResultadoPaginado<Local> recuperarLocaisComPaginacao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "nome", defaultValue = "") String nome,
            @RequestParam(value = "sortField", defaultValue = "nome") String sortField,
            @RequestParam(value = "sortOrder", defaultValue = "asc") String sortOrder,
            @RequestParam(value = "usuarioId", defaultValue = "0") Long usuarioId) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortField);
        Pageable pageable = PageRequest.of(pagina, tamanho, sort);
        Page<Local> page = localService.recuperarLocaisComPaginacao(pageable, nome, usuarioId);
        return new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
    }


    @GetMapping("categoria/paginacao")
    public ResultadoPaginado<Local> recuperarLocaisPaginadosPorNomeDaCategoria(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "nomeCategoria", defaultValue = "") String nomeCategoria) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Local> page = localService.recuperarLocaisPaginadosPorNomeDaCategoria(nomeCategoria, pageable);
        ResultadoPaginado<Local> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }
}
