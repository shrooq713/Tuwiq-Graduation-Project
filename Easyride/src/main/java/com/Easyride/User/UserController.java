package com.Easyride.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "users")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{userName}")
    public User getUser(@PathVariable String userName){
        System.out.println("userName");
        System.out.println(userName);
        return userService.getUserByUserName(userName);
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }
    @PutMapping("/{id}")
    public void updateUser(@PathVariable String id){
        userService.updateUser(id);
    }
}