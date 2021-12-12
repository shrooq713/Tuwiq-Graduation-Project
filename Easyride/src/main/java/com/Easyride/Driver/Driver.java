package com.Easyride.Driver;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="driver")
public class Driver {
    @Id
    String id;
    String FirstName;
    String LastName;
    String CarName;
    String CarType;
    String Licenses_plate;
    String Password;
}
