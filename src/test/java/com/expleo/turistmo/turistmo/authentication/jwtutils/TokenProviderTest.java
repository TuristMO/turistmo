package com.expleo.turistmo.turistmo.authentication.jwtutils;

import static org.assertj.core.api.Assertions.assertThat;

import com.expleo.turistmo.turistmo.domain.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.crypto.SecretKey;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

class TokenProviderTest {

    TokenProvider tokenProvider;
    String email;
    String role;

    @BeforeEach
    void setUp() {
        String secretKey = "securesecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecuresecure";
        SecretKey secretKey1 = Keys.hmacShaKeyFor(secretKey.getBytes());
        tokenProvider = new TokenProvider(secretKey1);

        email = "fazlizekiqi1@hotmail.com";
        role = Role.CURATOR.name();
    }

    @Test
    @DisplayName("It should generate json web token based on email and role.")
    void itShouldGenerateToken() {
        String jwtToken = tokenProvider.generateJwtToken(
            email,
            AuthorityUtils.createAuthorityList(role));
        assertThat(jwtToken).isNotNull();
    }

    @Test
    @DisplayName("It should decode json web token.")
    void itShouldDecodeToken() {
        String jwtToken = tokenProvider
            .generateJwtToken(email, AuthorityUtils.createAuthorityList(role));
        var claimsJws = tokenProvider.decodeToken(jwtToken);
        var body = claimsJws.getBody();
        var authorities = (List<Map<String, String>>) body.get("authorities");
        var mapAuthorities = authorities.get(0);
        var emailFromTokenDecoding = body.getSubject();
        String authorityFromTokenDecoding = mapAuthorities.get("authority");
        Date issuedAt = body.getIssuedAt();
        Date expiration = body.getExpiration();
        assertThat(email).isEqualTo(emailFromTokenDecoding);
        assertThat(role).isEqualTo(authorityFromTokenDecoding);
        assertThat(expiration).isInTheFuture();
        assertThat(expiration).isAfter(issuedAt);
    }


    @Test
    @DisplayName("It should not decode json web token.")
    void itShouldNotDecodeToken() {
        String token = "Invalid token";
        Jws<Claims> claimsJws = tokenProvider.decodeToken(token);
        assertThat(claimsJws).isNull();
    }

    @Test
    @DisplayName("It should get simple granted authorities from token provider.")
    void getAuthority() {
        List<Map<String, String>> authority = List.of(Map.of("authority", role));
        Set<SimpleGrantedAuthority> simpleGrantedAuthorities = tokenProvider.getAuthority(authority);
        assertThat(simpleGrantedAuthorities).hasSize(1);
        assertThat(simpleGrantedAuthorities).isNotNull();
    }

    @Test
    @DisplayName("It should remove bearer from token!")
    void itShouldRemoveBearerFromToken() {
        String token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmYXpsaXpla2l";

        String tokenWithoutBearer = tokenProvider.removeBearerFromToken(token);
        assertThat(tokenWithoutBearer).doesNotContain("Bearer ");
        assertThat(tokenWithoutBearer).isNotNull();
    }

    @ParameterizedTest
    @CsvSource({
        ",true",
        "   ,true",
        "'Some text',false",
        "'Some other text',false",
    })
    @DisplayName("It should check if a string is null or empty!")
    void isNullOrEmpty(String text, Boolean expected) {
        boolean isNullOrEmpty = tokenProvider.isNullOrEmpty(text);
        assertThat(isNullOrEmpty).isEqualTo(expected);
    }
}
