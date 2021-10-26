/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admin.fincas.app.servicio;

import com.admin.fincas.app.modelo.Category;
import com.admin.fincas.app.repositorio.RepositorioCategory;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author camil
 */
@Service
public class ServiciosCategory {

    @Autowired
    private RepositorioCategory crud;

    public List<Category> getAll() {
        return crud.getAll();
    }

    public Optional<Category> getCategoria(int idCategoria) {
        return crud.getCategoria(idCategoria);
    }

    public Category save(Category categoria) {
        if (categoria.getId() == null) {
            return crud.save(categoria);
        } else {
            Optional<Category> categoria1 = crud.getCategoria(categoria.getId());
            if (categoria1.isEmpty()) {
                return crud.save(categoria);
            } else {
                return categoria;
            }
        }
    }

    public Category update(Category categoria) {
        if(categoria.getId() != null){
            Optional<Category> list = crud.getCategoria(categoria.getId());
            if(!list.isEmpty()){
                if(categoria.getDescription() != null){
                    list.get().setDescription(categoria.getDescription());
                } else if(categoria.getName() != null){
                    list.get().setName(categoria.getName());
                }
                return crud.save(list.get());
            }
        }
        return categoria;
    }
    
    public boolean deleteCategoria(int idCategoria){
        Boolean flag = getCategoria(idCategoria).map(categoria ->{
            crud.delete(categoria);
            return true;
        }).orElse(false);
        return flag;
    }
}
