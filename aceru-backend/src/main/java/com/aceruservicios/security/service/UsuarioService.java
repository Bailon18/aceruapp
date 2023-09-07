package com.aceruservicios.security.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aceruservicios.security.entity.Usuario;
import com.aceruservicios.security.repository.UsuarioRepository;


@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public Usuario obtenerUsuarioporNombre(String nombreUsuario){
        return usuarioRepository.findByNombreUsuario(nombreUsuario).orElse(null);
    }

    public boolean existsByNombreUsuario(String nombreUsuario){
        return usuarioRepository.existsByNombreUsuario(nombreUsuario);
    }

    public boolean existsByEmail(String email){
        return usuarioRepository.existsByEmail(email);
    }

    public void save(Usuario usuario){
        usuarioRepository.save(usuario);
    }

    public void insertCompetencia(Long usuarioId, Long competenciaId) {
        usuarioRepository.insertUsuarioCompetencia(usuarioId, competenciaId);
    }
    
    public void insertProblema(Long usuarioId, Long problemaId) {
        usuarioRepository.insertUsuarioProblema(usuarioId, problemaId);
    }
    
    public boolean existsByUsuarioIdAndProblemaId(Long usuarioId, Long problemaId) {
        return usuarioRepository.existeUsuarioProblema(usuarioId, problemaId);
    }
    
    public List<Usuario> obtenerTodosUsuarios() {
        return usuarioRepository.findAll();
    }
    
    public List<Usuario> listarUsuariosParticipantes() {
    	
    	List<Usuario> listausuarioParticipante = new ArrayList<>();
    	
        List<Usuario> listadogeneral =  usuarioRepository.findAll();
        
        for (Usuario usuario : listadogeneral) {
			Usuario usuarioverificado = this.verificarrolUser(usuario) ;
			if( usuarioverificado != null) {
				listausuarioParticipante.add(usuarioverificado);
			}
		}
        
        return listausuarioParticipante;
    }
    
    public Usuario verificarrolUser(Usuario usuario) {
    	
    	Long idUsuario = usuarioRepository.buscarUsuarioRolUser(usuario.getId());
    	if( idUsuario != null) {
    		return usuario;
    	}
    	return null;
    	
    }

    public Usuario actualizarRangoUsuario(Long usuarioId, String nuevoRango) {
    	
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            usuario.setRango(nuevoRango);
            return usuarioRepository.save(usuario);
        } else {
        	return null;
        }
    }
}
