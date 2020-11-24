package com.expleo.turistmo.turistmo.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.anyString;

import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.exception.EmailAlreadyExistsException;
import com.expleo.turistmo.turistmo.exception.PasswordMismatchException;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import com.expleo.turistmo.turistmo.web.request.SignUpRequest;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class CuratorServiceTest {


    @Mock
    CuratorRepository curatorRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @InjectMocks
    CuratorService curatorService;

    @Captor
    ArgumentCaptor<String> emailCaptor;

    @Captor
    ArgumentCaptor<String> passwordCaptor;

    @Captor
    ArgumentCaptor<Curator> curatorCaptor;
    Curator johnDoeCurator;
    SignUpRequest signUpRequest;

    DomainResource domainResource;

    @BeforeEach
    void setUp() {
        domainResource = new DomainResource();
        johnDoeCurator = domainResource.getJohnDoeCurator();
        signUpRequest = domainResource.getSignUpRequest();
    }

    @Test
    @DisplayName("It should register curator.")
    void itShouldRegisterCurator() throws PasswordMismatchException {
        //GIVEN
        String ENCODED_PASSWORD = "ENCODED_PASSWORD";
        given(curatorRepository.findCuratorByEmail(anyString())).willReturn(Optional.empty());
        given(passwordEncoder.encode(anyString())).willReturn(ENCODED_PASSWORD);
        given(curatorRepository.save(any(Curator.class))).willReturn(johnDoeCurator);

        //WHEN
        Curator result = curatorService.register(signUpRequest);

        //THEN
        assertThat(result)
            .isEqualToComparingOnlyGivenFields(johnDoeCurator, "email", "password");
        then(curatorRepository).should().findCuratorByEmail(emailCaptor.capture());
        then(passwordEncoder).should().encode(passwordCaptor.capture());
        then(curatorRepository).should().save(curatorCaptor.capture());
        String capturedEmail = emailCaptor.getValue();
        String capturedPassword = passwordCaptor.getValue();
        Curator capturedCurator = curatorCaptor.getValue();
        assertThat(capturedEmail).isEqualTo(johnDoeCurator.getEmail());
        assertThat(capturedPassword).isEqualTo(signUpRequest.getPassword());
        assertThat(capturedCurator.getPassword()).isEqualTo(ENCODED_PASSWORD);
    }


    @Test
    @DisplayName("It should throw an EmailExistsException when registering a curator.")
    void itShouldThrowEmailExistsException() throws PasswordMismatchException {
        //GIVEN
        String exceptionMessage = String.format("Email: %s\nis already taken!", johnDoeCurator.getEmail());
        given(curatorRepository.findCuratorByEmail(anyString())).willReturn(Optional.of(johnDoeCurator));

        //WHEN
        assertThatThrownBy(() -> curatorService.register(signUpRequest))
            .isInstanceOf(EmailAlreadyExistsException.class)
            .hasMessage(exceptionMessage);

        //THEN
        then(curatorRepository).should().findCuratorByEmail(emailCaptor.capture());
        String capturedEmail = emailCaptor.getValue();
        assertThat(capturedEmail).isEqualTo(johnDoeCurator.getEmail());
    }

    @Test
    @DisplayName("It should throw an PasswordMismatchException when registering a curator.")
    void itShouldThrowPasswordMismatchException() throws PasswordMismatchException {
        //GIVEN
        signUpRequest.setConfirmPassword("Other password than the other one");
        String exceptionMessage = "The passwords doesn't match";
        given(curatorRepository.findCuratorByEmail(anyString())).willReturn(Optional.empty());

        //WHEN
        assertThatThrownBy(() -> curatorService.register(signUpRequest))
            .isInstanceOf(PasswordMismatchException.class)
            .hasMessage(exceptionMessage);

        //THEN
        then(curatorRepository).should().findCuratorByEmail(emailCaptor.capture());
        String capturedEmail = emailCaptor.getValue();
        assertThat(capturedEmail).isEqualTo(johnDoeCurator.getEmail());
    }
}

