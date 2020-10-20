package com.expleo.turistmo.turistmo.web;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.expleo.turistmo.turistmo.TuristMoWebEnvironment;
import com.expleo.turistmo.turistmo.authentication.payload.LoginRequest;
import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

@TuristMoWebEnvironment
public class TuristmoAuthenticationTest {

    private final String url = "/api/turistmo";
    @Autowired
    MockMvc mockMvc;

    @Autowired
    PasswordEncoder passwordEncoder;

    @MockBean
    CuratorRepository curatorRepository;

    @Test
    @DisplayName("It should login authenticated user.")
    void itShouldLogin() throws Exception {
        DomainResource domainResource = new DomainResource();
        Curator johnDoeCurator = domainResource.getJohnDoeCurator();
        johnDoeCurator.setEmail("fazli");
        String encodedPassword = passwordEncoder.encode(johnDoeCurator.getPassword());
        johnDoeCurator.setPassword(encodedPassword);
        johnDoeCurator.setVerified(Boolean.TRUE);

        given(curatorRepository.findCuratorByEmail(anyString())).willReturn(Optional.of(johnDoeCurator));
        LoginRequest login = new LoginRequest("fazlizekiqi1@hotmail.com", "123321");

        String json = new ObjectMapper().writeValueAsString(login);
        mockMvc.perform(post(url + "/login")
            .contentType(APPLICATION_JSON)
            .content(json))
            .andDo(print())
            .andExpect(status().isOk());
    }
}
