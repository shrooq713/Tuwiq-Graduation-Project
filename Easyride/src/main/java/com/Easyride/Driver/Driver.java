package com.Easyride.Driver;

import com.Easyride.Trip.Trip;
import com.Easyride.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @Column(unique = true)
    private String email;

    @JsonIgnore
    @OneToMany(mappedBy = "driver", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Trip> trip;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    public Driver() {
    }

    public Driver(String id, String firstName, String lastName, String carName, String carType, String licenses_plate, String password, String carImg, String phoneNumber, String email, List<Trip> trip, User user) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.carName = carName;
        this.carType = carType;
        this.licenses_plate = licenses_plate;
        this.password = password;
        this.carImg = carImg;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.trip = trip;
        this.user = user;
    }
}

