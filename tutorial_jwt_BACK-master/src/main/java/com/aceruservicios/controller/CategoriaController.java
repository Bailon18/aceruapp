package com.aceruservicios.controller;

import com.aceruservicios.entity.Categoria;
import com.aceruservicios.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categoria")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    ICategoriaService categoriService;

    @GetMapping("/lista")
    public ResponseEntity<List<Categoria>> list(){
        List<Categoria> lista = categoriService.listarCategoria();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }
}
