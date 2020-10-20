package com.expleo.turistmo.turistmo.authentication.myuserdetail;

import com.expleo.turistmo.turistmo.domain.Curator;
import java.util.Collection;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@RequiredArgsConstructor
public class MyUserDetail implements UserDetails {

    private final Curator curator;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.
            createAuthorityList(curator.getRole().name());
    }

    @Override
    public String getPassword() {
        return curator.getPassword();
    }

    @Override
    public String getUsername() {
        return curator.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return curator.getVerified();
    }
}
