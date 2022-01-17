package com.Easyride.Rider;

import com.Easyride.Trip.Trip;
import com.Easyride.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="rider")
@Data
public class Rider {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String password;
    private String phoneNumber;
    @Column(unique = true)
    private String email;

    public Rider(String id, String firstName, String lastName, String password, String phoneNumber, String email){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    @JsonIgnore
    @OneToMany(mappedBy = "rider", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Trip> trip;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    public Rider() {
    }

    public Rider(String id, String firstName, String lastName, String password, String phoneNumber, String email, List<Trip> trip, User user) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.trip = trip;
        this.user = user;
    }
}
