package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {
    @Query("SELECT e FROM Package e WHERE LOWER(e.city) = LOWER(?1)")
    Page<Package> findByCityIgnoreCase(String city, Pageable pageable);
    //Try with orApplication

    @Query("select pack FROM Package pack JOIN pack.usefulApplications u WHERE u.guid = (?1)")
    Page<Package> findByUsefulApplications(UUID guid, Pageable pageable);
}
