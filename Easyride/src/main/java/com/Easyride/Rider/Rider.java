package com.Easyride.Rider;

import com.Easyride.Trip.Trip;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Rider")
@Data
public class Rider {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String password;
    private String phoneNumber;
    private String email;

    @JsonIgnore
    @OneToMany(mappedBy = "rider", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Trip> trip;
}
