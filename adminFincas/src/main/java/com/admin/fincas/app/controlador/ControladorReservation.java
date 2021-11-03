package com.admin.fincas.app.controlador;

import com.admin.fincas.app.Report.ClientCounter;
import com.admin.fincas.app.Report.StatusReservation;
import com.admin.fincas.app.modelo.Reservation;
import com.admin.fincas.app.servicio.ServiciosReservation;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author camil
 */
@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods= {
    RequestMethod.GET,
    RequestMethod.POST,
    RequestMethod.PUT,
    RequestMethod.DELETE})
public class ControladorReservation {
    
    @Autowired
    private ServiciosReservation servicio;
    @GetMapping("/all")
    public List<Reservation> getReservations(){
        return servicio.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("id") int idReservation) {
        return servicio.getReservation(idReservation);
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation reservation) {
        return servicio.save(reservation);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation reservation) {
        return servicio.update(reservation);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int idReservation) {
        return servicio.deleteReservation(idReservation);
    }
    
    @GetMapping("/report-status")
    public StatusReservation getReservas(){
        return servicio.reporteStatusServicio();
    }
    
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getReservasTiempo(
            @PathVariable("dateOne") String dateOne,
            @PathVariable("dateTwo") String dateTwo){
        return servicio.reporteTiempoServicio(dateOne, dateTwo);
    }
    
    @GetMapping("/report-clients")
    public List<ClientCounter> getClientes(){
        return servicio.reporteClientesServicio();
    }
    
}
