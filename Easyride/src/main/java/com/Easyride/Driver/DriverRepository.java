package com.Easyride.Driver;

import com.Easyride.Rider.Rider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface DriverRepository extends JpaRepository<Driver,String> {
    @Query(value ="select * from driver where user_id =?1",nativeQuery = true)
    Driver findDriverByUserId(String userId);
}
