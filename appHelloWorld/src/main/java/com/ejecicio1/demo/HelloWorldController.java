/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ejecicio1.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author camil
 */
@RestController
@RequestMapping("/greet")
public class HelloWorldController {
    
    @GetMapping("/hello")
    public String saludar(){
        return "<h1>Hello World<h1>";
    }   
}
