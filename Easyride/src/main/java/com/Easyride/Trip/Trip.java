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
    String id;
    private float pickUpLat;
    private float pickUpLng;
    private float dropLat;
    private float dropLng;
    private String time;
    private String day;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "rider_id")
    private Rider rider;
}
