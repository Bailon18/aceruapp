package com.aceruservicios.service.imple;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aceruservicios.entity.Competencia;
import com.aceruservicios.enums.TipoEstadoCompetencia;
import com.aceruservicios.repository.CompetenciaRepo;
import com.aceruservicios.service.ICompetencia;

@Service
public class CompetenciaServiceImpl implements ICompetencia{

    @Autowired
    private CompetenciaRepo competenciaRepo;

    @Override
    public List<Competencia> listadarCompetencia(TipoEstadoCompetencia estado) {
        return competenciaRepo.findByEstadoOrderByFechaFinalDescIdDesc(estado);
    }
    
    @Override
    public Competencia guardarCompetencia(Competencia competencia) {
        return competenciaRepo.save(competencia);
    }
}
