package com.backend.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.todo.model.Tareas;
import com.backend.todo.repository.TareasRepository;

@Service
public class TareasService {
    @Autowired
    private TareasRepository tareaRepository;
    private String criterio; 
    
     public String getCriterio() {
        return criterio;
    }

    public void setCriterio(String criterio) {
        this.criterio = criterio;
    }

    public List<Tareas> ordenarTareas(String criterio, int idUsuario) {
        switch (criterio) {
            case "prioridad":
                return tareaRepository.findByUsuarioIdUsuarioAndCompletadaFalseOrderByPrioridadAsc(idUsuario);
            case "fecha":
                return tareaRepository.findByUsuarioIdUsuarioAndCompletadaFalseOrderByDuedateAsc(idUsuario);
            default:
                return tareaRepository.findByUsuarioIdUsuarioAndCompletadaFalseOrderByIdTareasAsc(idUsuario);
        }
    }

    public List<Tareas> añadirTareas(Tareas tarea) {
        tareaRepository.save(tarea);
        return tareaRepository.findByUsuarioIdUsuarioAndCompletadaFalseOrderByIdTareasAsc(tarea.getUsuario().getIdUsuario());
    }

    public List<Tareas> marcarCompletada(Tareas tarea) {
        tarea.setCompletada(true);
        tareaRepository.save(tarea);
        return tareaRepository.findByUsuarioIdUsuarioAndCompletadaFalseOrderByIdTareasAsc(tarea.getUsuario().getIdUsuario());
    }

    public List<Tareas> verTareas(int idUsuario) {
        return tareaRepository.findByUsuarioIdUsuarioAndCompletadaFalseOrderByIdTareasAsc(idUsuario);  
    } 
}
        

