/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admin.fincas.app.repositorio;

import com.admin.fincas.app.interfaces.InterfaceMessage;
import com.admin.fincas.app.modelo.Message;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author camil
 */
@Repository
public class RepositorioMessage {
    
    @Autowired
    private InterfaceMessage metodoCrud3;
    
    public List<Message> getAll(){
        return (List<Message>) metodoCrud3.findAll();
    }
    
    public Optional<Message> getMessage(int id){
        return metodoCrud3.findById(id);
    }
    
    public Message save(Message message){
        return metodoCrud3.save(message);
    }
    
    public void delete(Message message){
        metodoCrud3.delete(message);
    }
}
