package com.Easyride.Trip;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="trip")
@Data
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String pickUpLat;
    String pickUpLng;
    String dropLat;
    String dropLng;
    String time;
    String day;
}
