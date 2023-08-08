package com.aceruservicios.service.imple;

import com.aceruservicios.entity.Categoria;
import com.aceruservicios.repository.CategoriaRepo;
import com.aceruservicios.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class CategoriaService implements ICategoriaService {


    @Autowired
    private CategoriaRepo categoriarepo;

    @Override
    public List<Categoria> listarCategoria() {
        return categoriarepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Override
    public Categoria guardarCategoria(Categoria categoria) {
        return categoriarepo.save(categoria);
    }

    @Override
    public Categoria buscarCategoriId(Long categoriaId) {
        return categoriarepo.findById(categoriaId).orElse(null);
    }
}
