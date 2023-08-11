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
    public void guardarCategoria(Categoria categoria) {
        categoriarepo.save(categoria);
    }

    @Override
    public Categoria buscarCategoriId(Long categoriaId) {
        return categoriarepo.findById(categoriaId).orElse(null);
    }

    @Override
    public void actualizar(Categoria categoria) {

        Categoria categoriabase = this.buscarCategoriId(categoria.getId());

        if( categoriabase != null){

            categoriabase.setId(categoria.getId());
            categoriabase.setNombre(categoria.getNombre());
            categoriabase.setDescripcion(categoria.getDescripcion());
            categoriabase.setImagenurl(categoria.getImagenurl());
            categoriabase.setImagenid(categoria.getImagenid());
            categoriarepo.save(categoriabase);
        }
    }
}
