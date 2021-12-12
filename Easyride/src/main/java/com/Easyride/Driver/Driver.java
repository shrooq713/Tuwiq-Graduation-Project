package com.Easyride.Driver;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="driver")
@Data
public class Driver {
    @Id
    String id;
    String firstName;
    String lastName;
    String carName;
    String carType;
    String licenses_plate;
    String password;
    String carImg;
    String phoneNumber;
    String email;
}
