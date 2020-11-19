package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Curator;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuratorRepository extends JpaRepository<Curator,Long> {
    Optional<Curator> findCuratorByEmail( String email);
    Optional<Curator> findCuratorByGuid(UUID guid);
}
