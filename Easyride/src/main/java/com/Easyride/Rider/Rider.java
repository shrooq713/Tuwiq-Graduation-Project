package com.Easyride.Rider;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="driver")
public class Rider {
    @Id
    String id;
    String FirstName;
    String LastName;
    String Password;
}
