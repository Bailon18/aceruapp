package com.aceruservicios.repository;

import com.aceruservicios.entity.Problema;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProblemaRepo extends JpaRepository<Problema, Long> {

}
