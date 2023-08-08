package com.aceruservicios.service;

import com.aceruservicios.entity.Categoria;

import java.util.List;

public interface ICategoriaService {

    List<Categoria> listarCategoria();

    Categoria guardarCategoria(Categoria categoria);

    Categoria buscarCategoriId(Long categoriaId);

}
