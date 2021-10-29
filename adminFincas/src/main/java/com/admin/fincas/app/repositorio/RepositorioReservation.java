/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.admin.fincas.app.repositorio;

import com.admin.fincas.app.interfaces.InterfaceReservation;
import com.admin.fincas.app.modelo.Reservation;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author camil
 */
@Repository
public class RepositorioReservation {
    
    @Autowired
    private InterfaceReservation metodoCrud4;

    public List<Reservation> getAll(){
        return (List<Reservation>) metodoCrud4.findAll();
    }
    public Optional<Reservation> getReservation(int id){
        return metodoCrud4.findById(id);
    }
    public Reservation save(Reservation reservation){
        return metodoCrud4.save(reservation);
    }
    public void delete(Reservation reservation){
        metodoCrud4.delete(reservation);
    }
    
}
