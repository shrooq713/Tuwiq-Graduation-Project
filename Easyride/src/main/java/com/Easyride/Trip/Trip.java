package com.Easyride.Trip;

import com.Easyride.Driver.Driver;
import com.Easyride.Rider.Rider;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="trip")
@Data
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private float pickUpLat;
    private float pickUpLng;
    private float dropLat;
    private float dropLng;
    private String time;
    private String day;
    private boolean confirmed;
    private boolean accepted;
    private boolean canceled;
    private boolean ended;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "rider_id")
    private Rider rider;

    public Trip(double pickUpLat, double pickUpLng, double dropLat, double dropLng, String time, String day, boolean confirmed, boolean accepted,boolean cansled) {
    }

    public Trip() {
    }
}
