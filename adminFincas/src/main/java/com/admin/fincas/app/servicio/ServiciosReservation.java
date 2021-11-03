package com.admin.fincas.app.servicio;

import com.admin.fincas.app.Report.ClientCounter;
import com.admin.fincas.app.Report.StatusReservation;
import com.admin.fincas.app.modelo.Reservation;
import com.admin.fincas.app.repositorio.RepositorioReservation;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author camilo
 */
@Service
public class ServiciosReservation {
    
     @Autowired
    private RepositorioReservation crud4;
     
     /**
      * 
      * @return Lista con reservaciones
      */
    public List<Reservation> getAll(){
        return crud4.getAll();
    }
    /**
     * 
     * @param reservationId
     * @return Optional con reservacion 
     */
    public Optional<Reservation> getReservation(int reservationId) {
        return crud4.getReservation(reservationId);
    }
    
    /**
     * 
     * @param reservation
     * @return nueva reservacion
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
     * 
     * @param reservation
     * @return reserva actualizada
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
     * 
     * @param reservationId
     * @return boolean de borrado
     */
    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReservation(reservationId).map(reservation -> {
            crud4.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
    /**
     * 
     * @return reporte status servicio
     */
    public StatusReservation reporteStatusServicio(){
        List<Reservation> completed = crud4.reservacionStatusRepositorio("completed");
        List<Reservation> cancelled = crud4.reservacionStatusRepositorio("cancelled");
        
        return new StatusReservation(completed.size(), cancelled.size());
    }
    
    /**
     * 
     * @param datoA fecha inicio reserva
     * @param datoB fecha fin reserva
     * @return Lista reservas por fecha
     */
    public List<Reservation> reporteTiempoServicio(String datoA, String datoB){
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        
        Date datoUno = new Date();
        Date datoDos = new Date();
        
        try{
            datoUno = parser.parse(datoA);
            datoDos = parser.parse(datoB);
        }catch(ParseException evento){
            evento.printStackTrace();
        }
        if(datoUno.before(datoDos)){
            return crud4.reservacionTiempoRepositorio(datoUno, datoDos);
        }else{
            return new ArrayList<>();
        }
        
    }
    
    /**
     * 
     * @return lista clientes por servicio
     */
    public List<ClientCounter> reporteClientesServicio(){
        return crud4.getClientesRepositorio();
    }
    
}
