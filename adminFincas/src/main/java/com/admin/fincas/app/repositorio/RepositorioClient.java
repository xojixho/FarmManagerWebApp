/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admin.fincas.app.repositorio;

import com.admin.fincas.app.interfaces.InterfaceClient;
import com.admin.fincas.app.modelo.Client;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author camil
 */
@Repository
public class RepositorioClient {
    
    @Autowired
    private InterfaceClient metodoCrud2;
    
    public List<Client> getAll(){
        return (List<Client>) metodoCrud2.findAll();
    }
    public Optional<Client> getClient(int id){
        return metodoCrud2.findById(id);
    }

    public Client save(Client client){
        return metodoCrud2.save(client);
    }
    public void delete(Client client){
        metodoCrud2.delete(client);
    }
}
