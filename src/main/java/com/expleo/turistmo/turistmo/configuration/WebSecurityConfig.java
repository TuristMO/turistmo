package com.expleo.turistmo.turistmo.configuration;

import com.expleo.turistmo.turistmo.authentication.filters.JwtTokenVerifier;
import com.expleo.turistmo.turistmo.authentication.filters.JwtUsernameAndPasswordAuthenticationFilter;
import com.expleo.turistmo.turistmo.authentication.jwtutils.TokenProvider;
import com.expleo.turistmo.turistmo.exception.RestAuthenticationEntryPoint;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final CuratorRepository curatorRepository;
    private final TokenProvider tokenProvider;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(
                sessionManagementConfigurer -> sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
                httpSecurityExceptionHandlingConfigurer.authenticationEntryPoint(new RestAuthenticationEntryPoint()))
            .addFilter(jwtUsernameAndPasswordAuthenticationFilter())
            .addFilterAfter(new JwtTokenVerifier(tokenProvider), JwtUsernameAndPasswordAuthenticationFilter.class)
            .authorizeRequests(expressionInterceptUrlRegistry -> expressionInterceptUrlRegistry
                .antMatchers(
                    "/",
                    "/api/turistmo/**", // LOGIN & SIGNUP
                    "/api/v1/package/**",  // PACKAGE API
                    "/api/v1/application/**",  // APPLICATION API TODO: Make these controlled by jwt instead
                    "/api/v1/tag/**",  // TAG API TODO: Make these controlled by jwt instead
                    "/send",
                    "/css/*",
                    "/js/* ").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest()
                .authenticated()
            );
    }


    @SneakyThrows
    public JwtUsernameAndPasswordAuthenticationFilter jwtUsernameAndPasswordAuthenticationFilter() {
        JwtUsernameAndPasswordAuthenticationFilter jwt = new JwtUsernameAndPasswordAuthenticationFilter(
            authenticationManager(), curatorRepository, tokenProvider);
        jwt.setFilterProcessesUrl("/api/turistmo/login");
        return jwt;
    }


}
