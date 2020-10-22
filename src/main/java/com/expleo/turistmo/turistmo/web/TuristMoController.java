package com.expleo.turistmo.turistmo.web;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.exception.EmailAlreadyExistsException;
import com.expleo.turistmo.turistmo.exception.PasswordMismatchException;
import com.expleo.turistmo.turistmo.services.CuratorService;
import com.expleo.turistmo.turistmo.services.MailService;
import com.expleo.turistmo.turistmo.services.VerificationTokenService;
import com.expleo.turistmo.turistmo.web.request.SignUpRequest;
import com.expleo.turistmo.turistmo.web.response.Response;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/turistmo")
public class TuristMoController {

    private final CuratorService curatorService;
    private final MailService mailService;
    private final VerificationTokenService verificationService;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody SignUpRequest signUpCurator) {
        try {
            Curator curator = curatorService.register(signUpCurator);
            String token =verificationService.createEmailVerificationToken(curator);
            mailService.sendVerificationEmail(signUpCurator.getEmail(),token);
            return new ResponseEntity<>(
                new Response("Account is created successfully! Please verify your email."),
                CREATED);
        } catch (EmailAlreadyExistsException | PasswordMismatchException e) {
            throw new ResponseStatusException(BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/confirm")
    public ResponseEntity<?> confirmRegistration(@RequestParam String token) {
        try {
            verificationService.verifyToken(token);
            return ResponseEntity.ok(new Response("Your email is successfully verified!"));
        } catch (Exception e) {
            throw new ResponseStatusException(NOT_FOUND,e.getMessage());
        }
    }
}

