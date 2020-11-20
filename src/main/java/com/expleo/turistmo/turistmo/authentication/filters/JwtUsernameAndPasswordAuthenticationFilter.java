package com.expleo.turistmo.turistmo.authentication.filters;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON;

import com.expleo.turistmo.turistmo.authentication.jwtutils.TokenProvider;
import com.expleo.turistmo.turistmo.authentication.payload.LoginRequest;
import com.expleo.turistmo.turistmo.authentication.payload.LoginResponse;
import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.web.response.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Optional;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Slf4j
public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final CuratorRepository curatorRepository;
    private final TokenProvider tokenProvider;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            LoginRequest loginRequest = new ObjectMapper()
                .readValue(request.getInputStream(), LoginRequest.class);

            Authentication authenticate = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), // Principal
                loginRequest.getPassword()); // Credentials

            return authenticationManager.authenticate(authenticate);
        } catch (AuthenticationException | IOException e) {
            // One of the AuthenticationException must be thrown to invoke unsuccessfulAuthentication()
            //@SneakThrows doesn't handle that kind of Exception
            throw new AuthenticationCredentialsNotFoundException(e.getMessage());
        }
    }

    @Override
    @SneakyThrows
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
        Authentication authResult) {
        Optional<Curator> authenticatedUser = curatorRepository.findCuratorByEmail(authResult.getName());

        String token = tokenProvider.generateJwtToken(authResult.getName(), authResult.getAuthorities());
        String authorizationHeader = "Bearer ".concat(token);
        System.out.println(authorizationHeader);
        LoginResponse loginResponse = createLoginResponse(
            authorizationHeader,
            authenticatedUser.get());
        sendResponse(response,OK.value(),loginResponse);
        logger.info("Successful Authentication");
    }

    @Override
    @SneakyThrows
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        //TODO Discuss with the team if we should send something  when unsuccessful or not !
        sendResponse(response, UNAUTHORIZED.value(), new Response("Unauthorized!"));
        logger.error("Unsuccessful Authentication!");
    }

    private LoginResponse createLoginResponse(String authorizationHeader, Curator curator) {
        return LoginResponse.builder()
            .authorization(authorizationHeader)
            .body(curator)
            .status(OK.value())
            .build();
    }

    @SneakyThrows
    private  <T> void sendResponse(HttpServletResponse response, Integer status, T responseBody) {
        response.setStatus(status);
        response.setContentType(APPLICATION_JSON.toString());
        new ObjectMapper().writeValue(response.getOutputStream(), responseBody);
        response.getOutputStream().flush();
    }
}
