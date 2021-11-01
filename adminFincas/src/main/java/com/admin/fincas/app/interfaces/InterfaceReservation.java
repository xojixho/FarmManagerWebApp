/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.admin.fincas.app.interfaces;

import com.admin.fincas.app.modelo.Reservation;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author camil
 */
public interface InterfaceReservation extends CrudRepository<Reservation, Integer>{
    
}
