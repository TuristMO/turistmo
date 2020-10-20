package com.expleo.turistmo.turistmo.services;

import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.TokenType;
import com.expleo.turistmo.turistmo.domain.VerificationToken;
import com.expleo.turistmo.turistmo.exception.VerificationTokenException;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.repository.VerificationRepository;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VerificationTokenServiceTest  {

    @Mock
    VerificationRepository verificationRepository;

    @Mock
    CuratorRepository curatorRepository;

    @InjectMocks
    VerificationTokenService verificationTokenService;

    @Captor
    ArgumentCaptor<VerificationToken> tokenCaptor;

    @Captor
    ArgumentCaptor<String> stringCaptor;

    @Captor
    ArgumentCaptor<Curator> curatorArgumentCaptor;
    Curator johnDoeCurator;
    DomainResource domainResource;
    @BeforeEach
    void setUp() {
         domainResource = new DomainResource();
        johnDoeCurator=domainResource.getJohnDoeCurator();
    }

    @Test
    @DisplayName("It should create a verification token based on users information.")
    void itShouldCreateVerificationToken() {
        //GIVEN
        Date date = Timestamp.from(Instant.now().plusSeconds(500000));
        VerificationToken verificationToken = domainResource.getVerificationToken(johnDoeCurator, TokenType.REGISTRATION,date);
        given(verificationRepository.save(any(VerificationToken.class))).willReturn(verificationToken);
        //WHEN
        String result = verificationTokenService.createEmailVerificationToken(johnDoeCurator);

        //THEN
        assertThat(result).isNotNull();
        then(verificationRepository).should().save(tokenCaptor.capture());
        VerificationToken value = tokenCaptor.getValue();
        assertThat(value)
            .usingRecursiveComparison()
            .ignoringFields("token","expiry","createdDate")
            .isEqualTo(verificationToken);
    }

    @Test
    @DisplayName("It should verify curator with valid token.")
    void itShouldVerifyToken() {
        //GIVEN
        Date date = Timestamp.from(Instant.now().plusSeconds(500000));
        VerificationToken verificationToken = domainResource.getVerificationToken(johnDoeCurator, TokenType.REGISTRATION,date);
        given(verificationRepository.findByToken(anyString())).willReturn(Optional.of(verificationToken));

        //WHEN
        verificationTokenService.verifyToken(verificationToken.getToken());
        //THEN
        then(verificationRepository).should().delete(tokenCaptor.capture());
        then(verificationRepository).should().findByToken(stringCaptor.capture());
        VerificationToken capturedToken = tokenCaptor.getValue();
        String capturedEmail= stringCaptor.getValue();

        assertThat(capturedToken).isNotNull();
        assertThat(capturedEmail).isNotNull();
    }

    @Test
    @DisplayName("It should not verify curator with  invalid token after registration.")
    void itShouldNotVerifyToken() {
        //GIVEN
        String messageException="Invalid token!";
        String invalidToken= UUID.randomUUID().toString();
        given(verificationRepository.findByToken(anyString())).willReturn(Optional.empty());

        //WHEN
        assertThatThrownBy( ()->verificationTokenService.verifyToken(invalidToken))
            .isInstanceOf(VerificationTokenException.class)
            .hasMessage(messageException);

        //THEN
        then(verificationRepository).should().findByToken(stringCaptor.capture());
        then(verificationRepository).shouldHaveNoMoreInteractions();
        then(curatorRepository).shouldHaveNoInteractions();
        String value = stringCaptor.getValue();
        assertThat(value).isEqualTo(invalidToken);

    }

    @Test
    @DisplayName("It should not verify expired token after registering.")
    void itShouldNotVerifyExpiredToken() {
        //GIVEN
        Date date = Timestamp.from(Instant.now().minusSeconds(500000));
        String messageException="Expired token! Please make sure to register again.";
        VerificationToken expiredToken = domainResource.getVerificationToken(johnDoeCurator, TokenType.REGISTRATION, date);
        given(verificationRepository.findByToken(anyString())).willReturn(Optional.of(expiredToken));

        //WHEN
        assertThatThrownBy( ()->verificationTokenService.verifyToken(expiredToken.getToken()))
            .isInstanceOf(VerificationTokenException.class)
            .hasMessage(messageException);

        //THEN
        then(verificationRepository).should().delete(tokenCaptor.capture());
        then(curatorRepository).should().delete(curatorArgumentCaptor.capture());
        VerificationToken capturedToken = tokenCaptor.getValue();
        Curator capturedCurator = curatorArgumentCaptor.getValue();

        assertThat(capturedCurator)
            .usingRecursiveComparison()
            .isEqualTo(johnDoeCurator);

        assertThat(capturedToken)
            .usingRecursiveComparison()
            .ignoringFields("curator")
            .isEqualTo(expiredToken);
    }
}

