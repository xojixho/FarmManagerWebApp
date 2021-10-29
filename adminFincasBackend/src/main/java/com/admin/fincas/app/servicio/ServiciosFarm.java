/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admin.fincas.app.servicio;

import com.admin.fincas.app.modelo.Farm;
import com.admin.fincas.app.repositorio.RepositorioFarm;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author camil
 */
@Service
public class ServiciosFarm {
    @Autowired
    private RepositorioFarm crud2;
    
    public List<Farm> getAll(){
        return crud2.getAll();
    }
    
    public Optional<Farm> getFarm(int id){
        return crud2.getFarm(id);
    }
    
    public Farm save(Farm farm){
        if(farm.getId() == null){
            return crud2.save(farm);
        }else{
            Optional<Farm> list = crud2.getFarm(farm.getId());
            if(list.isEmpty()){
                return crud2.save(farm);
            }else{
                return farm;
            }
        }
    }
    
    public Farm update(Farm farm){
        if(farm.getId() != null){
            Optional<Farm> list = crud2.getFarm(farm.getId());
            if(!list.isEmpty()){
                if(farm.getName() != null){
                    list.get().setName(farm.getName());
                }
                if(farm.getAddress() != null){
                    list.get().setAddress(farm.getAddress());
                }
                if(farm.getCategory() != null){
                    list.get().setCategory(farm.getCategory());
                }
                if(farm.getDescription()!= null){
                    list.get().setDescription(farm.getDescription());
                }
                if(farm.getExtension() != null){
                    list.get().setExtension(farm.getExtension());
                }
                
                
                crud2.save(list.get());
                return list.get();
            }else{
                return farm;
            }
        } else{
            return farm;
        }
    }
    
    public boolean deleteFarm(int id){
        Boolean aBoolean = getFarm(id).map(farm -> {
            crud2.delete(farm);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
