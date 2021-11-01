/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admin.fincas.app.servicio;

import com.admin.fincas.app.modelo.Message;
import com.admin.fincas.app.repositorio.RepositorioMessage;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author camil
 */
@Service
public class ServiciosMessage {

    @Autowired
    private RepositorioMessage crud3;

    public List<Message> getAll() {
        return crud3.getAll();
    }

    public Optional<Message> getMessage(int idMessage) {
        return crud3.getMessage(idMessage);
    }

    public Message save(Message message) {
        if (message.getIdMessage() == null) {
            return crud3.save(message);
        } else {
            Optional<Message> list = crud3.getMessage(message.getIdMessage());
            if (list.isEmpty()) {
                return crud3.save(message);
            } else {
                return message;
            }
        }
    }

    public Message update(Message message) {
        if (message.getIdMessage() != null) {
            Optional<Message> list = crud3.getMessage(message.getIdMessage());
            if (!list.isEmpty()) {
                if (message.getMessageText() != null) {
                    list.get().setMessageText(message.getMessageText());
                }
                crud3.save(list.get());
                return list.get();
            } else {
                return message;
            }
        } else {
            return message;
        }
    }

    public boolean deleteMessage(int idMessage) {
        Boolean aBoolean = getMessage(idMessage).map(message -> {
            crud3.delete(message);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
