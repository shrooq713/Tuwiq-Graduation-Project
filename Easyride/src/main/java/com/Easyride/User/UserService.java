package com.Easyride.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user= userRepository.findByUserName(username);
        if(user == null){
            System.out.println("user does not exist");
            throw new UsernameNotFoundException("user does not exist");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));


        return new org.springframework.security.core.userdetails.User(user.getUserName(),user.getPassword(),authorities);
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUserByUserName(String userName){
        return userRepository.findByUserName(userName);
    }

    public User createUser(User user){
        if(userRepository.findByUserName(user.getUserName()) == null){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            System.out.println("user");
            System.out.println(user);
            return userRepository.save(user);}
        else{
            return null;
        }
    }

    public void updateUser(String id){
        long longId = Long.parseLong(id);
        User user = userRepository.findById(longId).orElse(null);
        userRepository.save(user);
    }
}