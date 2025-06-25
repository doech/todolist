package com.backend.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.todo.model.Tareas;

@Repository
public interface TareasRepository extends JpaRepository<Tareas, Integer> {
    int countByUsuarioIdUsuario(int idUsuario);
    int countByUsuarioIdUsuarioAndCompletadaTrue(int idUsuario);

    List<Tareas> findByUsuarioIdUsuarioAndCompletadaFalseOrderByIdTareasAsc(int idUsuario);
    List<Tareas> findByUsuarioIdUsuarioAndCompletadaFalseOrderByPrioridadAsc(int idUsuario);
    List<Tareas> findByUsuarioIdUsuarioAndCompletadaFalseOrderByDuedateAsc(int idUsuario);
}
