package com.backend.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.todo.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    List<Usuario> findByIdUsuario(int idUsuario);
    Usuario findByNombreUsuarioAndContraseña(String nombreUsuario, String contraseña);
}
