package com.expleo.turistmo.turistmo.services;

import java.util.Date;
import javax.mail.internet.InternetAddress;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${app.site.url}")
    String url;

    public void sendVerificationEmail(String emailAddress, String token) {
        Context context = new Context();
        context.setVariable("token", token);
        context.setVariable("url", url);
        String emailContent = templateEngine.process("verify-mail", context);

        MimeMessagePreparator preparator = mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
            message.setTo(emailAddress);
            message.setFrom(new InternetAddress("no-reply@turistmo.com"));
            message.setSubject("Please Verify Your Email Address");
            message.setSentDate(new Date());
            message.setText(emailContent, true);
        };
        mailSender.send(preparator);

    }

}
