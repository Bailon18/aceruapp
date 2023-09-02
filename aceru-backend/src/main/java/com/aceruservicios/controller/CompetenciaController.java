package com.aceruservicios.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aceruservicios.entity.Competencia;
import com.aceruservicios.enums.TipoEstadoCompetencia;
import com.aceruservicios.service.ICompetencia;

@RestController
@RequestMapping("/competencia")
@CrossOrigin(origins = "*")
public class CompetenciaController {

    @Autowired
    private ICompetencia competenciaService;
    
    @GetMapping("/porEstado/{estado}")
    public List<Competencia> listarCompetenciasPorEstado(@PathVariable TipoEstadoCompetencia estado) {
        return competenciaService.listadarCompetencia(estado);
    }

    @PostMapping("/crear")
    public Competencia crearCompetencia(@RequestBody Competencia competencia) {
        return competenciaService.guardarCompetencia(competencia);
    }
}
