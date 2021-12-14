package com.Easyride.Trip;

import com.Easyride.Driver.Driver;
import com.Easyride.Rider.Rider;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="trip")
@Data
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    private long pickUpLat;
    private long pickUpLng;
    private long dropLat;
    private long dropLng;
    private String time;
    private String day;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "rider_id")
    private Rider rider;
}
