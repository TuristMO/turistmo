package com.expleo.turistmo.turistmo.authentication.filters;


import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

import com.expleo.turistmo.turistmo.authentication.jwtutils.TokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;


@Slf4j
@AllArgsConstructor
public class JwtTokenVerifier extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);

        if (tokenProvider.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            String token = tokenProvider.removeBearerFromToken(authorizationHeader);
            Jws<Claims> claimsJws = tokenProvider.decodeToken(token);
            var jwsBody = claimsJws.getBody();
            var subject = jwsBody.getSubject(); // The Actual username that we pass to subject variable
            var authorities = (List<Map<String, String>>) jwsBody.get("authorities");

            var simpleGrantedAuthorities = tokenProvider.getAuthority(authorities);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                subject,
                null,
                simpleGrantedAuthorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            response.sendError(FORBIDDEN.value());
            return;
        }
        // After first filter and second filter we want to send back the expected resource back to client
        filterChain.doFilter(request, response);
    }

}
