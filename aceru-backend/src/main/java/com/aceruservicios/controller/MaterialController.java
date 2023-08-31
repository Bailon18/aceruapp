package com.aceruservicios.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aceruservicios.dto.MaterialDTO;
import com.aceruservicios.entity.Material;
import com.aceruservicios.service.IMaterialService;
import org.springframework.util.Base64Utils;

@RestController
@RequestMapping("/material")
@CrossOrigin(origins = "*")
public class MaterialController {
	
	
	@Autowired
	private IMaterialService materialService;
	
    @GetMapping("/list")
    public ResponseEntity<List<Material>> getAllMaterials() {
        List<Material> materials = materialService.getAllMaterialsDesc();
        return new ResponseEntity<>(materials, HttpStatus.OK);
    }

   
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE, "multipart/form-data;charset=UTF-8" })
    public ResponseEntity<Material> createMaterial(
            @RequestPart("material") Material material,
            @RequestPart("archivo") MultipartFile archivo) throws IOException {

        byte[] archivoBytes = archivo.getBytes();
        
        material.setArchivo(archivoBytes);
        materialService.saveMaterial(material);

        return new ResponseEntity<>(material, HttpStatus.CREATED);
    }

    
    /*@GetMapping("/{id5}")
    public ResponseEntity<Material> getMaterialById(@PathVariable Long id) {
        Material material = materialService.getMaterialPorId(id);
        	
        if (material != null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(material, HttpStatus.OK);
    }*/
    
    @GetMapping("/{id}")
    public ResponseEntity<MaterialDTO> metodobusqueda(@PathVariable Long id) {
        Material material = materialService.getMaterialPorId(id);

        if (material != null) {
            MaterialDTO materialDTO = new MaterialDTO();
            materialDTO.setId(material.getId());
            materialDTO.setNombre(material.getNombre());
            materialDTO.setDescripcion(material.getDescripcion());
            materialDTO.setTipoMaterial(material.getTipoMaterial().toString());
            materialDTO.setUrl(material.getUrl());

            if (material.getArchivo() != null) {
                byte[] archivoBytes = material.getArchivo();
                String base64Archivo = Base64Utils.encodeToString(archivoBytes);
                materialDTO.setArchivoBase64(base64Archivo);
            }

            return new ResponseEntity<>(materialDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    
    
    @GetMapping("/porcategory/{categoryId}")
    public ResponseEntity<List<Material>> getMaterialsByCategory(@PathVariable Long categoryId) {
        List<Material> material = materialService.getMaterialsByCategory(categoryId);
        return new ResponseEntity<>(material, HttpStatus.OK);
    }
    
    
}
