/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admin.fincas.app.interfaces;

import com.admin.fincas.app.modelo.Farm;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author camil
 */
public interface InterfaceFarm extends CrudRepository< Farm, Integer> {
    
}
