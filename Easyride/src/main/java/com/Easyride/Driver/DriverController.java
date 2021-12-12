package com.Easyride.Driver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path= "driver")
@CrossOrigin("*")
public class DriverController {
    private final DriverServices driverServices;

    @Autowired
    public DriverController(DriverServices driverServices) {
        this.driverServices = driverServices;
    }

    @GetMapping
    public List<Driver> getDrivers(){
        System.out.println("inside get");
        return driverServices.getDrivers();
    }

    @GetMapping(path = "/{id}")
    public Driver getDriver(@PathVariable String id){
        return driverServices.getDriver(id);
    }

    @PostMapping
    public Driver addDriver(@RequestBody Driver driver){
        System.out.println("inside post");
        return driverServices.addDriver(driver);
    }

    @PutMapping("/{id}")
    public Driver updateDriver(@PathVariable String id, @RequestBody Driver driver){
        return driverServices.updateDriver(id, driver);
    }

    @DeleteMapping ("/{id}")
    public Driver deleteDriver(@PathVariable String id){
        return driverServices.deleteDriver(id);
    }
}
