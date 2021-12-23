package com.Easyride.Rider;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
class RiderRepositoryTest {
    private final RiderRepository riderRepository;

    @Autowired
    RiderRepositoryTest(RiderRepository riderRepository) {
        this.riderRepository = riderRepository;
    }

    @Test
    void itShouldFindDriver() {
//        Rider rider = new Rider("123", "Shrooq","Alamri","1234","0555555555","Sh@gmail.com");
//        Rider savedRider = riderRepository.save(rider);
//        Rider result = riderRepository.findById(savedRider.getId()).orElse(null);
//        assertNotNull(result);
    }
}