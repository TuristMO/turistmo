package com.expleo.turistmo.turistmo.services;

import static java.lang.Boolean.TRUE;

import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.TokenType;
import com.expleo.turistmo.turistmo.domain.VerificationToken;
import com.expleo.turistmo.turistmo.exception.VerificationTokenException;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.repository.VerificationRepository;
import java.util.Date;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class VerificationTokenService {

    private final VerificationRepository verificationRepository;
    private final CuratorRepository curatorRepository;

    public String createEmailVerificationToken(Curator curator) {
        VerificationToken verificationToken = getVerificationTokenByCurator(curator);
        verificationRepository.save(verificationToken);
        return verificationToken.getToken();
    }

    public void verifyToken(String token) {
        VerificationToken verificationToken = verificationRepository
            .findByToken(token)
            .orElseThrow(() -> new VerificationTokenException("Invalid token!"));

        Date expiryDate = verificationToken.getExpiry();
        Curator curator = verificationToken.getCurator();
        verificationRepository.delete(verificationToken);

        if (expiryDate.before(new Date())) {
            curatorRepository.delete(curator);
            throw new VerificationTokenException("Expired token! Please make sure to register again.");
        }
        curator.setVerified(TRUE);
        curatorRepository.save(curator);
    }

    private VerificationToken getVerificationTokenByCurator(Curator curator) {
        return VerificationToken.builder()
            .token(UUID.randomUUID().toString())
            .curator(curator)
            .type(TokenType.REGISTRATION)
            .build();
    }
}
