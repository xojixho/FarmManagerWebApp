/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.admin.fincas.app.Report;

import com.admin.fincas.app.modelo.Client;

/**
 *
 * @author camil
 */
public class ClientCounter {
    
    private Long total;
    private Client client;
    
    public ClientCounter(Long total, Client cliente){
        this.total = total;
        this.client = cliente;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    
    
}
