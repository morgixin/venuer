package com.devweb.venuer.controller;

import com.devweb.venuer.model.Facilidade;
import com.devweb.venuer.model.Inclusao;
import com.devweb.venuer.model.Local;
import com.devweb.venuer.model.Restricao;
import com.devweb.venuer.service.AutenticacaoService;
import com.devweb.venuer.service.OptionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
//@RequestMapping("")
public class OptionsController
{
    @Autowired
    private OptionsService optionsService;

    @GetMapping  ("/res")  // GET para http://localhost:8080/locais
    public ResponseEntity<List<Restricao>> recuperarLocais() {
        return new ResponseEntity<>(optionsService.recuperarRestricoes(), HttpStatus.OK);
    }

    @GetMapping   ("inc") // GET para http://localhost:8080/locais
    public ResponseEntity<List<Inclusao>> recuperarInclusao() {
        return new ResponseEntity<>(optionsService.recuperarInclusoes(), HttpStatus.OK);
    }

    @GetMapping   ("fac") // GET para http://localhost:8080/locais
    public ResponseEntity<List<Facilidade>> recuperarFacilidade() {
        return new ResponseEntity<>(optionsService.recuperarFacilidades(), HttpStatus.OK);
    }

}
