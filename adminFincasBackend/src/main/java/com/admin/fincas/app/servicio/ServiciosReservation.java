package com.admin.fincas.app.servicio;

import com.admin.fincas.app.modelo.Reservation;
import com.admin.fincas.app.repositorio.RepositorioReservation;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author camil
 */
@Service
public class ServiciosReservation {
    
     @Autowired
    private RepositorioReservation crud4;
     

     /**
      * El metodo getAll busca todas las reservaciones
      * @return lista
      */
    public List<Reservation> getAll(){
        return crud4.getAll();
    }

    /**
     * Buscar reservacion por id
     * @param reservationId
     * @return lista
     */
    public Optional<Reservation> getReservation(int reservationId) {
        return crud4.getReservation(reservationId);
    }

    /**
     * registra nueva reserva
     * @param reservation
     * @return reservation
     */
    public Reservation save(Reservation reservation){
        if(reservation.getIdReservation()==null){
            return crud4.save(reservation);
        }else{
            Optional<Reservation> list= crud4.getReservation(reservation.getIdReservation());
            if(list.isEmpty()){
                return crud4.save(reservation);
            }else{
                return reservation;
            }
        }
    }

    /**
     * actualizar 
     * @param reservation
     * @return reservation
     */
    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation()!=null){
            Optional<Reservation> list= crud4.getReservation(reservation.getIdReservation());
            if(!list.isEmpty()){

                if(reservation.getStartDate()!=null){
                    list.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate()!=null){
                    list.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getStatus()!=null){
                    list.get().setStatus(reservation.getStatus());
                }
                crud4.save(list.get());
                return list.get();
            }else{
                return reservation;
            }
        }else{
            return reservation;
        }
    }

    /**
     * borrar
     * @param reservationId
     * @return boolean
     */
    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReservation(reservationId).map(reservation -> {
            crud4.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
}
