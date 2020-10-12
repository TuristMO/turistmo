package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Curator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuratorRepository extends JpaRepository<Curator,Long> {

}
