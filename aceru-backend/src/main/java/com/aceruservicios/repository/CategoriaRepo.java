package com.aceruservicios.repository;

import com.aceruservicios.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepo extends JpaRepository<Categoria, Long> {

}
