package com.Easyride.Rider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "rider")
@CrossOrigin("*")
public class RiderController {
    private final RiderServices riderServices;
    @Autowired
    public RiderController(RiderServices riderServices) {
        this.riderServices = riderServices;
    }

    @GetMapping
    public List<Rider> getRiders(){
        return riderServices.getRiders();
    }

    @GetMapping(path = "/{id}")
    public Rider getRider(@PathVariable String id){
        return riderServices.getRider(id);
    }

    @PostMapping
    public Rider addRider(@RequestBody Rider rider){
        return riderServices.addRider(rider);
    }

    @PutMapping("/{id}")
    public Rider updateRider(@PathVariable String id, @RequestBody Rider rider){
        return riderServices.updateRider(id, rider);
    }

    @DeleteMapping ("/{id}")
    public Rider deleteRider(@PathVariable String id){
        return riderServices.deleteRider(id);
    }

    @GetMapping("/rider/user/{userId}")
    public Rider getRiderByUserId(@PathVariable String userId){
        System.out.println("in");
        return riderServices.getRiderByUserId(userId);
    }
}
