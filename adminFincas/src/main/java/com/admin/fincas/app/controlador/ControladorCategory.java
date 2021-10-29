/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admin.fincas.app.controlador;

import com.admin.fincas.app.modelo.Category;
import com.admin.fincas.app.servicio.ServiciosCategory;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author camil
 */
@RestController
@RequestMapping("/api/Category")
@CrossOrigin(origins = "*", methods = {
    RequestMethod.GET,
    RequestMethod.POST,
    RequestMethod.PUT, 
    RequestMethod.DELETE})

public class ControladorCategory {
    
    @Autowired
    private ServiciosCategory servicio;
    
    @GetMapping("/all")
    public List<Category> getCategorias(){
        return servicio.getAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Category> getCategoria(@PathVariable("id") int idCategoria){
        return servicio.getCategoria(idCategoria);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Category save(@RequestBody Category categoria){
        return servicio.save(categoria);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Category update(@RequestBody Category categoria){
        return servicio.update(categoria);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int idCategoria){
        return servicio.deleteCategoria(idCategoria);
    }
    
}
