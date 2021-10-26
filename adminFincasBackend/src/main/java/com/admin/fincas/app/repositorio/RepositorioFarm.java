/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admin.fincas.app.repositorio;

import com.admin.fincas.app.interfaces.InterfaceFarm;
import com.admin.fincas.app.modelo.Farm;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author camil
 */
@Repository
public class RepositorioFarm {
    @Autowired
    private InterfaceFarm crud;
    
    public List<Farm> getAll(){
        return (List<Farm>) crud.findAll();
    }
    
    public Optional<Farm> getFarm(int id){
        return crud.findById(id);
    }
    
    public Farm save(Farm farm){
        return crud.save(farm);
    }
    
    public void delete(Farm farm){
        crud.delete(farm);
    }
}
