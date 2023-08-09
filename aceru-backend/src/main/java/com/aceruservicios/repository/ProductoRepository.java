package com.aceruservicios.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aceruservicios.entity.Producto;

import java.util.Optional;


public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    Optional<Producto> findByNombre(String nombre);
    boolean existsByNombre(String nombre);
}
