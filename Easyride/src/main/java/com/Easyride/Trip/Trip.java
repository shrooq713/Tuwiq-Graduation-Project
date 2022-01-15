package com.Easyride.Trip;

import com.Easyride.Driver.Driver;
import com.Easyride.Rider.Rider;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="trip")
@Data
@AllArgsConstructor
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
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

    public Trip(double v, double v1, double v2, double v3, String time, String saturday) {
    }

}
