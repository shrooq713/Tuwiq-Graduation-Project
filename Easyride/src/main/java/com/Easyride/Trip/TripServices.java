package com.Easyride.Trip;

import com.Easyride.Driver.Driver;
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
        int tripId = Integer.parseInt(id);
        return tripRepsitory.findById(tripId).orElse(null);
    }

    public Trip addTrip(Trip trip){

        System.out.println(trip.getPickUpLat());
        return tripRepsitory.save(trip);
    }

    public Trip updateTrip(String id, Trip data) {
        int tripId = Integer.parseInt(id);
        Trip trip= tripRepsitory.findById(tripId).orElse(null);
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

    public Trip updateTripAccepted(String id, String accepted, Driver driver) {
        int tripId = Integer.parseInt(id);
        boolean tripAccepted =Boolean.parseBoolean(accepted);
        Trip trip= tripRepsitory.findById(tripId).orElse(null);
        if(trip != null) {
            trip.setAccepted(tripAccepted);
            trip.setDriver(driver);
            tripRepsitory.save(trip);
            return trip;
        }
        return null;
    }

    public Trip updateTripCanceled(String id) {
        int tripId = Integer.parseInt(id);
        Trip trip= tripRepsitory.findById(tripId).orElse(null);
        if(trip != null) {
            trip.setCanceled(true);
            tripRepsitory.save(trip);
            return trip;
        }
        return null;
    }
    public Trip updateTripEnded(String id) {
        int tripId = Integer.parseInt(id);
        Trip trip= tripRepsitory.findById(tripId).orElse(null);
        if(trip != null) {
            trip.setEnded(true);
            tripRepsitory.save(trip);
            return trip;
        }
        return null;
    }

    public Trip deleteTrip(String id) {
        int tripId = Integer.parseInt(id);
        Trip trip = tripRepsitory.findById(tripId).orElse(null);
        tripRepsitory.deleteById(tripId);
        return trip;
    }
}
