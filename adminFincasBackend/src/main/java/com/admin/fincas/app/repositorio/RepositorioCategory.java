/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admin.fincas.app.repositorio;

import com.admin.fincas.app.interfaces.InterfaceCategory;
import com.admin.fincas.app.modelo.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author camil
 */
@Repository
public class RepositorioCategory {
    
    @Autowired
    private InterfaceCategory metodoCrud;
    
    public List<Category> getAll(){
        return (List<Category>) metodoCrud.findAll();
    }
    
    public Optional<Category> getCategoria(int id){
        return metodoCrud.findById(id);
    }
    
    public Category save(Category categoria){
        return metodoCrud.save(categoria);
    }
    
    public void delete(Category categoria){
        metodoCrud.delete(categoria);
    }
}
