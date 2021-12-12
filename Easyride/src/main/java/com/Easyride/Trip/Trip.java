package com.Easyride.Trip;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="trip")
@Data
public class Trip {
    @Id
    String id;
    String pickUpLoc;
    String dropLoc;
    String time;
}
