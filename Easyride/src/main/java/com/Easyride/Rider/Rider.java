package com.Easyride.Rider;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Rider")
@Data
public class Rider {
    @Id
    String id;
    String firstName;
    String lastName;
    String password;
    String phoneNumber;
    String email;
}
