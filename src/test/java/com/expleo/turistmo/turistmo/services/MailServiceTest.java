package com.expleo.turistmo.turistmo.services;

import static org.assertj.core.api.Assertions.assertThat;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.ServerSetup;
import java.util.UUID;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.junit.After;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureTestDatabase
class MailServiceTest {

    @Autowired
    MailService emailService;

    private GreenMail smtpServer;

    @BeforeEach
    void setUp() {
        smtpServer = new GreenMail(new ServerSetup(9898, null, "smtp"));
        smtpServer.start();
    }

    @Test
    @DisplayName("It should send single email with mail gun.")
    public void shouldSendSingleMail() throws MessagingException {
        String email = "fazlizekiqi1@hotmail.com";
        emailService.sendVerificationEmail(email, UUID.randomUUID().toString());

        MimeMessage[] receivedMessages = smtpServer.getReceivedMessages();
        MimeMessage receivedMessage = receivedMessages[0];

        String replyTo = receivedMessage.getHeader("Return-Path", ",");
        String toEmail = receivedMessage.getHeader("To", ",");
        String subject = receivedMessage.getSubject();

        assertThat(replyTo).isEqualTo("<no-reply@turistmo.com>");
        assertThat(toEmail).isEqualTo(email);
        assertThat(subject).isEqualTo("Please Verify Your Email Address");
    }

    @After
    public void tearDown() {
        smtpServer.stop();
    }
}
