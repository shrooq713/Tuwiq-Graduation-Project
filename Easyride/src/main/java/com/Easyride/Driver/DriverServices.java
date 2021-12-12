package com.Easyride.Driver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverServices {
    private final DriverRepository driverRepository;
    @Autowired
    public DriverServices(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public List<Driver> getDrivers(){
        return driverRepository.findAll();
    }
    public Driver getDriver(String id){
        return driverRepository.findById(id).orElse(null);
    }

    public Driver addDriver(Driver driver){
        return driverRepository.save(driver);
    }

    public Driver updateDriver(String id, Driver data) {
        Driver driver= driverRepository.findById(id).orElse(null);
        if(driver != null) {
            driver.setFirstName(data.getFirstName());
            driver.setLastName(data.getLastName());
            driver.setCarName(data.getCarName());
            driver.setCarType(data.getCarType());
            driver.setLicenses_plate(data.getLicenses_plate());
            driver.setPassword(data.getPassword());
            driver.setCarImg(data.getCarImg());
            driver.setPhoneNumber(data.getPhoneNumber());
            driver.setEmail(data.getPassword());
            driverRepository.save(driver);
            return driver;
        }
        return null;
    }

    public Driver deleteDriver(String id) {
        Driver driver = driverRepository.findById(id).orElse(null);
        driverRepository.deleteById(id);
        return driver;
    }
}
