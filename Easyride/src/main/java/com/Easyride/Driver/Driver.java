package com.Easyride.Driver;

import com.Easyride.Trip.Trip;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="driver")
@Data
public class Driver {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String carName;
    private String carType;
    private String licenses_plate;
    private String password;
    private String carImg;
    private String phoneNumber;
    private String email;

    @JsonIgnore
    @OneToMany(mappedBy = "driver", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Trip> trip;
}

