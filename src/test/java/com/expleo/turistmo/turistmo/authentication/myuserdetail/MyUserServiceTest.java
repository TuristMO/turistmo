package com.expleo.turistmo.turistmo.authentication.myuserdetail;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.times;

import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.resource.DomainResource;
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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


@ExtendWith(MockitoExtension.class)
class MyUserServiceTest {

    @Mock
    CuratorRepository curatorRepository;

    @InjectMocks
    MyUserService myUserService;

    @Captor
    ArgumentCaptor<String> emailCaptor;

    DomainResource domainResource;

    @BeforeEach
    void setUp() {
        domainResource = new DomainResource();
    }

    @Test
    @DisplayName("It should load user by email!")
    void loadUserByEmail() {
        //GIVEN
        Curator alissaMcarthy = domainResource.getAlissaMcarthyCurator();
        alissaMcarthy.setVerified(Boolean.TRUE);
        given(curatorRepository.findCuratorByEmail(anyString())).willReturn(Optional.of(alissaMcarthy));

        //WHEN
        UserDetails result = myUserService.loadUserByUsername(alissaMcarthy.getEmail());

        //THEN

        assertThat(result)
            .extracting("password", "username", "authorities")
            .doesNotContainNull();
        assertThat(result)
            .extracting("enabled", "credentialsNonExpired", "accountNonLocked", "accountNonExpired")
            .allMatch(o -> o.equals(Boolean.TRUE));
        then(curatorRepository).should(times(1)).findCuratorByEmail(emailCaptor.capture());
        String capturedEmail = emailCaptor.getValue();
        assertThat(capturedEmail).isEqualTo(alissaMcarthy.getEmail());
    }

    @Test
    @DisplayName("It should not load user by email.")
    void itShouldNotLoadUserByEmail() {
        //GIVEN
        String email = "non-registered-user@gmail.com";
        given(curatorRepository.findCuratorByEmail(anyString())).willReturn(Optional.empty());

        //WHEN
        assertThatThrownBy(() -> myUserService.loadUserByUsername(email))
            .isInstanceOfAny(UsernameNotFoundException.class)
            .hasMessage(String.format("User not found with email : %s", email));

        //THEN
        then(curatorRepository).should(times(1)).findCuratorByEmail(emailCaptor.capture());
        String capturedEmail = emailCaptor.getValue();
        assertThat(capturedEmail).isEqualTo(email);

    }
}

