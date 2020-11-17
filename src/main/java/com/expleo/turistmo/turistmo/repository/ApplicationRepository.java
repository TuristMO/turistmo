package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    @Query("SELECT a FROM Application a WHERE (a.guid) = (?1)")
    Page<Application> findApplicationsByGuid(UUID guid, Pageable pageable);

    @Query("SELECT a FROM Application a WHERE LOWER(a.title) = LOWER(?1)")
    Page<Application> findApplicationsByTitle(String title, Pageable pageable);

    Application findByTitle(String title);

    Optional<Application> findByGuid(UUID applicationGuid);
}
