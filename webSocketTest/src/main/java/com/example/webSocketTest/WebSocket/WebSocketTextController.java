package com.example.webSocketTest.WebSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class WebSocketTextController {

    @Autowired
    SimpMessagingTemplate template;

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody TextMessageDTO textMessageDTO) {
        template.convertAndSend("/topic/message", textMessageDTO);
        System.out.println("inside sendMessage()");
        System.out.println(textMessageDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // if a message is sent to the /sendMessage destination, the receiveMessage() method is called.
    //The payload of the message is bound to a textMessageDTO object, which is passed into receiveMessage().
    @MessageMapping("/sendMessage")
    public void receiveMessage(@Payload TextMessageDTO textMessageDTO) {
        // receive message from client
        System.out.println("in receiveMessage");
        System.out.println(textMessageDTO.getMessage());
    }

    @SendTo("/topic/message")
    public TextMessageDTO broadcastMessage(@Payload TextMessageDTO textMessageDTO) {
        System.out.println("in broadcastMessage");
        System.out.println(textMessageDTO);
        return textMessageDTO;
    }

}