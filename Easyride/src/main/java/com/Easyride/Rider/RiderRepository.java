package com.Easyride.Rider;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RiderRepository extends JpaRepository<Rider,String> {
    @Query(value ="select * from rider where user_id =?1",nativeQuery = true)
    Rider findRiderByUserId(String userId);

}
