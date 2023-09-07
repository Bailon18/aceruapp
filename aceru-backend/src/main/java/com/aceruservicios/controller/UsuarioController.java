package com.aceruservicios.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aceruservicios.security.entity.Usuario;
import com.aceruservicios.security.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping("/insertCompetencia/{nombreusuario}/{competenciaId}")
    public void insertCompetencia(@PathVariable String nombreusuario,
    		@PathVariable Long competenciaId) {
    	Usuario usuarioencontrado = usuarioService.obtenerUsuarioporNombre(nombreusuario);
        usuarioService.insertCompetencia(usuarioencontrado.getId(), competenciaId);
    }
    
    @GetMapping("/insertProblema/{nombreusuario}/{problemaId}")
    public void insertProblema(@PathVariable String nombreusuario,
    		@PathVariable Long problemaId) {
    	Usuario usuarioencontrado = usuarioService.obtenerUsuarioporNombre(nombreusuario);
        usuarioService.insertProblema(usuarioencontrado.getId(), problemaId);
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<Usuario>> getAllMaterials() {
        List<Usuario> usuarios = usuarioService.listarUsuariosParticipantes();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }
    
    

    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsByUsuarioIdAndProblemaId(
    		@PathVariable String nombreusuario,
    		@PathVariable Long problemaId) {
    	Usuario usuarioencontrado = usuarioService.obtenerUsuarioporNombre(nombreusuario);
        boolean exists = usuarioService.existsByUsuarioIdAndProblemaId(usuarioencontrado.getId(), problemaId);
        return ResponseEntity.ok(exists);
    }
}
