package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.VerificationToken;
import java.util.Optional;
import javax.swing.text.html.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationRepository extends JpaRepository<VerificationToken, Long> {

    Optional<VerificationToken> findByToken(String token);
}
