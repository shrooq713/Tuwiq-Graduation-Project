package com.Easyride.User;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "users")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User register(@RequestBody Form form){
        return userService.register(form);
    }

    @GetMapping("/{id}")
    public User getuser(@PathVariable String id){
        return userService.getUser(id);
    }
}

@Data
class Form {
    private User user;
    private Long role_id;
}