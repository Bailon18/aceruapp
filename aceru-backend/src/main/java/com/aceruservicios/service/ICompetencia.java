package com.aceruservicios.service;

import java.util.List;

import com.aceruservicios.entity.Competencia;
import com.aceruservicios.enums.TipoEstadoCompetencia;

public interface ICompetencia {
    
    List<Competencia> listadarCompetencia(TipoEstadoCompetencia estado);
    Competencia guardarCompetencia(Competencia competencia);

}
