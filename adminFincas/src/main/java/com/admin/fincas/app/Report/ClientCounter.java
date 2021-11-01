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
    private Client cliente;
    
    public ClientCounter(Long total, Client cliente){
        this.total = total;
        this.cliente = cliente;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Client getCliente() {
        return cliente;
    }

    public void setCliente(Client cliente) {
        this.cliente = cliente;
    }
    
    
}
