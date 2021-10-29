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
    private InterfaceFarm metodoCrud3;
    
    public List<Farm> getAll(){
        return (List<Farm>) metodoCrud3.findAll();
    }
    
    public Optional<Farm> getFarm(int id){
        return metodoCrud3.findById(id);
    }
    
    public Farm save(Farm farm){
        return metodoCrud3.save(farm);
    }
    
    public void delete(Farm farm){
        metodoCrud3.delete(farm);
    }
}
