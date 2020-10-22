package com.expleo.turistmo.turistmo.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

    @Value("${app.mailgun.domain}")
    private String DOMAIN;
    @Value("${app.mailgun.password}")
    private String SMTP_PASSWORD;

    @Value("${app.mailgun.host}")
    private String HOST;

    @Value("${app.mailgun.port}")
    private Integer PORT;

    @Bean
    public JavaMailSender mailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(HOST);
        mailSender.setPort(PORT);
        mailSender.setUsername(DOMAIN);
        mailSender.setPassword(SMTP_PASSWORD);
        return mailSender;
    }


}
