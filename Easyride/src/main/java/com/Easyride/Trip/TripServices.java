package com.Easyride.Trip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TripServices {
    private final TripRepsitory tripRepsitory;

    @Autowired
    public TripServices(TripRepsitory tripRepsitory) {
        this.tripRepsitory = tripRepsitory;
    }

    public List<Trip> getTrips(){
        return tripRepsitory.findAll();
    }
    public Trip getTrip(String id){
        return tripRepsitory.findById(id).orElse(null);
    }

    public Trip addTrip(Trip trip){
        return tripRepsitory.save(trip);
    }

    public Trip updateTrip(String id, Trip data) {
        Trip trip= tripRepsitory.findById(id).orElse(null);
        if(trip != null) {
            trip.setPickUpLat(data.getPickUpLat());
            trip.setPickUpLng(data.getPickUpLng());
            trip.setDropLat(data.getDropLat());
            trip.setDropLng(data.getDropLng());
            trip.setTime(data.getTime());
            trip.setDay(data.getDay());
            tripRepsitory.save(trip);
            return trip;
        }
        return null;
    }

    public Trip deleteTrip(String id) {
        Trip trip = tripRepsitory.findById(id).orElse(null);
        tripRepsitory.deleteById(id);
        return trip;
    }
}
