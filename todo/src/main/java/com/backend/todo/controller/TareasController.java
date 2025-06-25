package com.backend.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.backend.todo.model.Tareas;
import com.backend.todo.service.TareasService;  

//poner aca todo lo de dashboard, ordenar tareas, añadir tareas y mostrar completada
//tmb incluir la vista de calendario 

@Controller
@RequestMapping("/to-do")
public class TareasController {
    @Autowired
    private TareasService tareasService;


    @GetMapping("/ver")
    public List<Tareas> verTareas(@RequestParam int idUsuario){
        return tareasService.verTareas(idUsuario);
    }

    @PostMapping("/añadir")
    public List<Tareas> añadirTareas(@RequestBody Tareas tarea) {
        return tareasService.añadirTareas(tarea);
    }

    @PostMapping("/completada")
    public List<Tareas> marcarCompletada(@RequestBody Tareas tarea) {
        return tareasService.marcarCompletada(tarea);
    }

    @GetMapping("/ordenar")
    public List<Tareas> ordenarTareas(@RequestParam String criterio, int idUsuario) {
        tareasService.setCriterio(criterio);
        return tareasService.ordenarTareas(criterio, idUsuario);
    }

}
