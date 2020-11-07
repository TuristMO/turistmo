package com.expleo.turistmo.turistmo.web;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.expleo.turistmo.turistmo.TuristMoWebEnvironment;
import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.Role;
import com.expleo.turistmo.turistmo.exception.EmailAlreadyExistsException;
import com.expleo.turistmo.turistmo.exception.PasswordMismatchException;
import com.expleo.turistmo.turistmo.exception.VerificationTokenException;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import com.expleo.turistmo.turistmo.services.CuratorService;
import com.expleo.turistmo.turistmo.services.MailService;
import com.expleo.turistmo.turistmo.services.VerificationTokenService;
import com.expleo.turistmo.turistmo.web.request.SignUpRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@TuristMoWebEnvironment
class TuristMoControllerTest {

    @Autowired
    MockMvc mockMvc;

    private final String url = "/api/turistmo";

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    CuratorService curatorService;

    @MockBean
    MailService mailService;

    @MockBean
    VerificationTokenService verificationService;
    DomainResource domainResource;

    @Captor
    ArgumentCaptor<String> stringCaptor;

    @BeforeEach
    void setUp() {
        domainResource = new DomainResource();
    }

    @Test
    @DisplayName("It should register curator.")
    void itShouldRegisterCurator() throws Exception, PasswordMismatchException {
        //GIVEN
        SignUpRequest signUpRequest = domainResource.getSignUpRequest();
        Curator johnDoeCurator = domainResource.getJohnDoeCurator();
        String token = UUID.randomUUID().toString();
        String json = objectMapper.writeValueAsString(signUpRequest);
        given(curatorService.register(any(SignUpRequest.class))).willReturn(johnDoeCurator);
        given(verificationService.createEmailVerificationToken(any(Curator.class))).willReturn(token);

        //WHEN
        mockMvc.perform(post(url + "/signup")
            .contentType(APPLICATION_JSON)
            .content(json))
            .andDo(print())
            .andExpect(jsonPath("$.message", is("Account is created successfully! Please verify your email.")))
            .andExpect(status().isCreated());
        //THEN
        then(curatorService).should().register(any(SignUpRequest.class));
        then(verificationService).should().createEmailVerificationToken(any(Curator.class));
        then(mailService).should().sendVerificationEmail(anyString(), anyString());
    }

    @Test
    @DisplayName("It should not register curator when passing two different passwords.")
    void itShouldNotRegisterCurator() throws Exception, PasswordMismatchException {
        //GIVEN
        SignUpRequest signUpRequest = new SignUpRequest("turistmo@gmail.com", "password", "differentPassword","tur","istmo");
        String ERROR_MESSAGE = "Passwords should match";
        given(curatorService.register(any(SignUpRequest.class)))
            .willThrow(new PasswordMismatchException(ERROR_MESSAGE));
        String json = objectMapper.writeValueAsString(signUpRequest);

        //WHEN
        MvcResult mvcResult = performCuratorRegistration(json);
        //THEN
        assertResultAndVerifyInteractions(ERROR_MESSAGE, mvcResult);
    }

    @Test
    @DisplayName("It should not register curator that already exists.")
    void itShouldNotRegisterCuratorThatAlreadyExists() throws Exception, PasswordMismatchException {
        //GIVEN
        SignUpRequest signUpRequest = new SignUpRequest("turistmo@gmail.com", "password", "password","tur","istmo");
        String ERROR_MESSAGE = "Account already exists!";
        given(curatorService.register(any(SignUpRequest.class)))
            .willThrow(new EmailAlreadyExistsException(ERROR_MESSAGE));
        String json = objectMapper.writeValueAsString(signUpRequest);

        //WHEN
        MvcResult mvcResult = performCuratorRegistration(json);
        //THEN
        assertResultAndVerifyInteractions(ERROR_MESSAGE, mvcResult);
    }

    @Test
    @DisplayName("It should verify email with token.")
    void itShouldVerifyEmail() throws Exception {
        //GIVEN
        final String responseMessage="Your email is successfully verified!";
        final String token=UUID.randomUUID().toString();
        doNothing().when(verificationService).verifyToken(anyString());

        //WHEN
        mockMvc.perform(get(url + "/confirm")
            .param("token",token)
            .accept(APPLICATION_JSON))
            .andExpect(jsonPath("$.message", is(responseMessage)))
            .andExpect(status().isOk());
        //THEN
        then(verificationService).should().verifyToken(stringCaptor.capture());
        String capturedToken = stringCaptor.getValue();
        assertThat(capturedToken).isEqualTo(token);
    }

    @Test
    @DisplayName("It should not verify email with invalid token.")
    void itShouldNotVerifyWithInvalidToken() throws Exception {
        //GIVEN
        final String errorMessage="Invalid token!";
        final String token="123321123";
        doThrow(new VerificationTokenException("Invalid token!"))
            .when(verificationService)
            .verifyToken(anyString());

        //WHEN
        MockHttpServletResponse response = mockMvc.perform(get(url + "/confirm")
            .param("token", token)
            .accept(APPLICATION_JSON))
            .andExpect(status().isNotFound())
            .andReturn()
            .getResponse();
        //THEN
        String responseError = response.getErrorMessage();
        assertThat(responseError).isEqualTo(errorMessage);
        then(verificationService).should().verifyToken(stringCaptor.capture());
        String capturedToken = stringCaptor.getValue();
        assertThat(capturedToken).isEqualTo(token);
    }

    @Test
    @DisplayName("Curator should get response ")
    @WithMockUser(username = "fazli",password = "123321",authorities = "CURATOR")
    void itShouldGetResponseAsCurator() throws Exception {
        mockMvc.perform(get("/secured")
            .accept(APPLICATION_JSON))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Curator should get response ")
    @WithMockUser(username = "fazli",password = "123321",authorities = "ADMIN")
    void itShouldNotGetResponseWithoutAuthorities() throws Exception {
        mockMvc.perform(get("/secured")
            .accept(APPLICATION_JSON))
            .andExpect(status().isForbidden());
    }


    private void assertResultAndVerifyInteractions(String ERROR_MESSAGE, MvcResult mvcResult) {
        MockHttpServletResponse response = mvcResult.getResponse();
        assertThat(response.getErrorMessage()).isEqualTo(ERROR_MESSAGE);
        then(mailService).shouldHaveNoInteractions();
        then(verificationService).shouldHaveNoInteractions();
    }

    private MvcResult performCuratorRegistration(String signUpRequest) throws Exception {
        return mockMvc.perform(post(url + "/signup")
            .contentType(APPLICATION_JSON)
            .content(signUpRequest))
            .andDo(print())
            .andExpect(status().isBadRequest())
            .andReturn();
    }


}
