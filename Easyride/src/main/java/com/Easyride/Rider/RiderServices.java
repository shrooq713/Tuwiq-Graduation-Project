package com.Easyride.Rider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RiderServices {
    private final RiderRepository riderRepository;
    @Autowired
    public RiderServices(RiderRepository riderRepository) {
        this.riderRepository = riderRepository;
    }

    public List<Rider> getRiders(){
        return riderRepository.findAll();
    }
    public Rider getRider(String id){
        return riderRepository.findById(id).orElse(null);
    }

    public Rider addRider(Rider rider){
        return riderRepository.save(rider);
    }

    public Rider updateRider(String id, Rider data) {
        Rider rider= riderRepository.findById(id).orElse(null);
        if(rider != null) {
            rider.setFirstName(data.getFirstName());
            rider.setLastName(data.getLastName());
            rider.setPassword(data.getPassword());
            rider.setPhoneNumber(data.getPhoneNumber());
            rider.setEmail(data.getEmail());
            riderRepository.save(rider);
            return rider;
        }
        return null;
    }

    public Rider deleteRider(String id) {
        Rider rider = riderRepository.findById(id).orElse(null);
        riderRepository.deleteById(id);
        return rider;
    }

    public Rider getRiderByUserId(String userId) {
        return riderRepository.findRiderByUserId(userId);
    }
}
