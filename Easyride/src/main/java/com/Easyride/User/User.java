package com.Easyride.User;

import com.Easyride.Driver.Driver;
import com.Easyride.Rider.Rider;
import lombok.Data;
import javax.persistence.*;

@Entity
@Table
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String userName;
    private String password;
    private String role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Rider riders;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Driver drivers;

}
