package com.expleo.turistmo.turistmo.authentication.jwtutils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class TokenProvider {

    private final SecretKey secretKey;

    public String generateJwtToken(String email, Collection<? extends GrantedAuthority> authorities) {
        return Jwts.builder()
            .setSubject(email)
            .claim("authorities", authorities)
            .setIssuedAt(new java.util.Date())
            // TODO MOVE EXPIRATION DATE TO APPLICATION PROPERTIES
            .setExpiration(Date.valueOf(LocalDate.now().plusDays(5)))
            .signWith(secretKey)
            .compact();
    }


    public Jws<Claims> decodeToken(String token) {
        try {
            return Jwts
                .parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            log.info("JTW TOKEN EXPIRED");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported Token");
        } catch (MalformedJwtException e) {
            log.info("MalFormed JWT");
        } catch (SignatureException e) {
            log.info("Signature Exception");
        } catch (IllegalArgumentException e) {
            log.info("Illegal Argument");
        }
        return null;
    }

    public Set<SimpleGrantedAuthority> getAuthority(List<Map<String, String>> authorities) {
        return authorities.stream()
            .map(auth -> new SimpleGrantedAuthority(auth.get("authority")))
            .collect(Collectors.toSet());
    }

    public String removeBearerFromToken(String authorizationHeader) {
        // TODO MOVE AUTHORIZATION HEADER TO APPLICATION PROPERTIES
        return authorizationHeader.replace("Bearer ", "");
    }

    public boolean isNullOrEmpty(String string) {
        return string == null || string.isEmpty();
    }

}
