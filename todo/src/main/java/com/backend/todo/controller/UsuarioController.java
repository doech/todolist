package com.backend.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.todo.service.UsuarioService;
import com.backend.todo.model.Usuario;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


//poner aca todo lo de login y register, tmb endpoint para nivel jardin porque progreso se mira en dashboard
@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public Usuario registrar(@RequestBody Usuario usuario) {
        return usuarioService.registrar(usuario);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {
        return usuarioService.login(usuario.getNombreUsuario(), usuario.getContraseña());
    }

    @GetMapping("/progreso")
    public int calcularProgreso(int idUsuario) {
        return usuarioService.calcularProgreso(idUsuario);
    }

    @GetMapping("/nivel-jardin")
    public int calcularNivelJardin(int idUsuario) {
        return usuarioService.calcularNivelJardin(idUsuario);
    }
    
}

