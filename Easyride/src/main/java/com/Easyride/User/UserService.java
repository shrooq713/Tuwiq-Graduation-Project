package com.Easyride.User;

import com.Easyride.Role.Role;
import com.Easyride.Role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User getUser(String id) {
        Long user_id = Long.parseLong(id);
        return userRepository.findById(user_id).orElse(null);
    }

    public User register(Form form){
        User user = form.getUser();
        Long role_id = form.getRole_id();
        Role role = roleRepository.findById(role_id).orElse(null);
        user.getRoles().add(role);
        return userRepository.save(user);
    }
}
