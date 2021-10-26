/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.admin.fincas.app.servicio;

import com.admin.fincas.app.modelo.Client;
import com.admin.fincas.app.repositorio.RepositorioClient;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author camil
 */
@Service
public class ServiciosClient {
       @Autowired
     private RepositorioClient crud1;
     
     public List<Client> getAll(){
        return crud1.getAll();
    }
     
      public Optional<Client> getClient(int idClient) {
        return crud1.getClient(idClient);
    }

    public Client save(Client client){
        if(client.getIdClient()==null){
            return crud1.save(client);
        }else{
            Optional<Client> list = crud1.getClient(client.getIdClient());
            if(list.isEmpty()){
                return crud1.save(client);
            }else{
                return client;
            }
        }
    }

    public Client update(Client client){
        if(client.getIdClient()!=null){
            Optional<Client> list = crud1.getClient(client.getIdClient());
            if(!list.isEmpty()){
                if(client.getName()!=null){
                    list.get().setName(client.getName());
                }
                if(client.getAge()!=null){
                    list.get().setAge(client.getAge());
                }
                if(client.getEmail()!=null){
                    list.get().setEmail(client.getEmail());
                }
                crud1.save(list.get());
                return list.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }

    public boolean deleteClient(int clientId) {
        Boolean aBoolean = getClient(clientId).map(client -> {
            crud1.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
}