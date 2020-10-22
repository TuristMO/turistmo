package com.expleo.turistmo.turistmo.services;

import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.exception.EmailAlreadyExistsException;
import com.expleo.turistmo.turistmo.exception.PasswordMismatchException;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.web.request.SignUpRequest;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CuratorService {

    private final CuratorRepository curatorRepository;
    private final PasswordEncoder passwordEncoder;

    public Curator register(SignUpRequest signUpCurator) throws PasswordMismatchException {
        final String email = signUpCurator.getEmail();
        Optional<Curator> curatorByEmail = curatorRepository.findCuratorByEmail(email);

        if (curatorByEmail.isPresent()) {
            throw new EmailAlreadyExistsException(String.format("Email %s is already taken!", email));
        }
        if (!signUpCurator.getConfirmPassword().contentEquals(signUpCurator.getPassword())) {
            throw new PasswordMismatchException(
                String.format("Password %s doesn't match with your password confirmation %s!",
                    signUpCurator.getPassword(), signUpCurator.getConfirmPassword()));
        }
        String encodedPassword = passwordEncoder.encode(signUpCurator.getPassword());
        Curator newCuratorAccount = Curator.builder()
            .email(email)
            .password(encodedPassword)
            .build();
        return curatorRepository.save(newCuratorAccount);
    }
}
