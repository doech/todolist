package com.backend.todo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.todo.model.Usuario;
import com.backend.todo.repository.TareasRepository;
import com.backend.todo.repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private TareasRepository tareaRepository;
    
    public int calcularProgreso(int idUsuario) {
    int total = tareaRepository.countByUsuarioIdUsuario(idUsuario);
    if (total == 0) return 0;
    int completadas = tareaRepository.countByUsuarioIdUsuarioAndCompletadaTrue(idUsuario);
    return ((completadas * 100) / total);
    }

    public int calcularNivelJardin(int idUsuario) {
        int progreso = calcularProgreso(idUsuario);
        if (progreso < 20) return 1; 
        else if (progreso < 40) return 2;
        else if (progreso < 60) return 3; 
        else if (progreso < 80) return 4; 
        else return 5; 
    }

    @Autowired
    private UsuarioRepository usuarioRepository;
    public Usuario registrar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario login(String nombreUsuario, String contraseña) {
        try {
            Usuario usuario =  usuarioRepository.findByNombreUsuarioAndContraseña(nombreUsuario, contraseña);
            if (usuario == null) {
                throw new RuntimeException("Usuario o contraseña incorrectos");
            }
            return usuario;
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Error al iniciar sesión: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Error al iniciar sesión: " + e.getMessage());
        }
    }

    


    

}
