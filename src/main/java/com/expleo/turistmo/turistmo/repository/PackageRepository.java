package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Package;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {
   List<Package> findAllByCity();
}
