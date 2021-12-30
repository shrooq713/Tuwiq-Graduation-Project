package com.example.webSocketTest.WebSocket;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.util.HtmlUtils;

import java.security.Principal;

@Controller
public class MessageController {
    @Autowired
    private NotificationService notificationService;

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public ResponseMessage getMessage(final Message message) throws InterruptedException {
        Thread.sleep(1000);
        notificationService.sendGlobalNotification();
        System.out.println("Message: ");
        System.out.println(message.getMessageContent());
        return new ResponseMessage(HtmlUtils.htmlEscape(message.getMessageContent()));
    }

    @MessageMapping("/private-message")
    @SendToUser("/topic/private-messages")
    public ResponseMessage getPrivateMessage(final Message message,
                                             final Principal principal) throws InterruptedException {
        Thread.sleep(1000);
        notificationService.sendPrivateNotification(principal.getName());
        return new ResponseMessage(HtmlUtils.htmlEscape(
                "Sending private message to user " + principal.getName() + ": "
                        + message.getMessageContent())
        );
    }

    @PostMapping("/send")
    @SendTo("/topic/messages")
    public ResponseMessage sendMessage(@RequestBody final Message message) throws InterruptedException{
        Thread.sleep(1000);
        notificationService.sendGlobalNotification();
//        template.convertAndSend("/topic/message", message);
        System.out.println("inside sendMessage()");
        System.out.println(message);
        return new ResponseMessage(HtmlUtils.htmlEscape(
                "Sending message to frontend " + message.getMessageContent())
        );
    }
}
