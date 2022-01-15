package com.Easyride.Trip;

import com.Easyride.Rider.Rider;
import com.Easyride.Rider.RiderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class TripRepsitoryTest {

    private final TripRepsitory tripRepsitory;

    @Autowired
    TripRepsitoryTest(TripRepsitory tripRepsitory) {
        this.tripRepsitory = tripRepsitory;
    }

    @Test
    void itShouldFindTrip() {
        Trip trip = new Trip(24.56,47.83,24.56,47.83,"12:34","Saturday");
        Trip savedTrip = tripRepsitory.save(trip);
        Trip result = tripRepsitory.findById(savedTrip.getId()).orElse(null);
        assertNotNull(result);
    }
    @Test
    void itShouldSaveCity() {
        Trip trip = new Trip(24.56,47.83,24.56,47.83,"12:34","Saturday");
        Trip savedTrip = tripRepsitory.save(trip);
        assertTrue(Long.valueOf(savedTrip.getId()) != null);
    }
}