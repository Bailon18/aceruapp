package com.aceruservicios.controller;


import com.aceruservicios.dto.Mensaje;
import com.aceruservicios.entity.Categoria;
import com.aceruservicios.service.ICategoriaService;
import com.aceruservicios.service.imple.CloudinaryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/categoria")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    ICategoriaService categoriService;

    @Autowired
    CloudinaryServiceImpl cloudService;

    @GetMapping("/lista")
    public ResponseEntity<List<Categoria>> list(){
        List<Categoria> lista = categoriService.listarCategoria();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @PostMapping(value="/nuevo", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE, "multipart/form-data;charset=UTF-8" })
    public ResponseEntity<?> nuevaCategoria(@RequestPart("categoria") Categoria categoria,
                                            @RequestPart("imagen") MultipartFile multipartFile)
            throws IOException {

        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if(bi == null){
            return new ResponseEntity<>(new Mensaje("imagen no válida"), HttpStatus.BAD_REQUEST);
        }

        Map result = cloudService.upload(multipartFile);

        categoria.setImagenid((String) result.get("public_id"));
        categoria.setImagenurl((String) result.get("url"));

        // aqui validamos si el actualizado o creacion
        if(categoria.getId() != null){
            categoriService.actualizar(categoria);
        }else{
            categoriService.guardarCategoria(categoria);
        }
        return new ResponseEntity<>(new Mensaje("imagen subida"), HttpStatus.OK);
    }
}
