package com.Easyride.Trip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path= "trip")
@CrossOrigin("*")
public class TripController {
    private final TripServices tripServices;
    @Autowired
    public TripController(TripServices tripServices) {
        this.tripServices = tripServices;
    }

    @GetMapping
    public List<Trip> getTrips(){
        return tripServices.getTrips();
    }

    @GetMapping(path = "/{id}")
    public Trip getTrip(@PathVariable String id){
        return tripServices.getTrip(id);
    }

    @PostMapping
    public Trip addTrip(@RequestBody Trip trip){
        return tripServices.addTrip(trip);
    }

    @PutMapping("/{id}")
    public Trip updateTrip(@PathVariable String id, @RequestBody Trip trip){
        return tripServices.updateTrip(id, trip);
    }

    @DeleteMapping ("/{id}")
    public Trip deleteRider(@PathVariable String id){
        return tripServices.deleteTrip(id);
    }
}