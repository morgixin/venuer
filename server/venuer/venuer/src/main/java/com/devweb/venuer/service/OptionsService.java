package com.devweb.venuer.service;

import com.devweb.venuer.model.Facilidade;
import com.devweb.venuer.model.Inclusao;
import com.devweb.venuer.model.Local;
import com.devweb.venuer.model.Restricao;
import com.devweb.venuer.repository.FacilidadeRepository;
import com.devweb.venuer.repository.InclusaoRepository;
import com.devweb.venuer.repository.RestricaoRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OptionsService {
    @Autowired
    private FacilidadeRepository facilidadeRepository;
    @Autowired
    private RestricaoRepository restricaoRepository;
    @Autowired
    private InclusaoRepository inclusaoRepository;

    public List<Facilidade> recuperarFacilidades() {
        return facilidadeRepository.recuperarFacilidades();
    }
    public List<Restricao> recuperarRestricoes() {
        return restricaoRepository.recuperarRestricoes();
    }
    public List<Inclusao> recuperarInclusoes() {
        return inclusaoRepository.recuperarInclusoes();
    }
}
