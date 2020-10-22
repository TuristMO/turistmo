package com.expleo.turistmo.turistmo.authentication.myuserdetail;


import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.TokenType;
import com.expleo.turistmo.turistmo.domain.VerificationToken;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.repository.VerificationRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MyUserService implements UserDetailsService {

    private final CuratorRepository curatorRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        return curatorRepository.findCuratorByEmail(email)
            .map(MyUserDetail::new)
            .orElseThrow(() -> new UsernameNotFoundException(String.format("User not found with email : %s", email)));
    }


}
