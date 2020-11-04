package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class CuratorRepositoryTest {

    @Autowired
    CuratorRepository curatorRepository;

    @Autowired
    PackageRepository packageRepository;

    @Autowired
    TestEntityManager testEntityManager;


    Package stockholmPackage;
    Package göteborgPackage;
    Application sl;
    Application taxiApplication;
    Tag travelTag;

    DomainResource domainResource;

    Timestamp dateAsTimestamp = Timestamp.valueOf(LocalDateTime.now());

    Curator john;
    Curator alissa;
    @BeforeEach
    void setUp() {
        domainResource = new DomainResource();

        john = domainResource.getJohnDoeCurator();
        alissa = domainResource.getAlissaMcarthyCurator();

        stockholmPackage = domainResource.getStockholmPackage();
        göteborgPackage = domainResource.getGoteborgPackage();

        sl = domainResource.getSLApplication();
        taxiApplication = domainResource.getTaxiApplication();

        travelTag = domainResource.getTravelTag();

        testEntityManager.persistAndFlush(john);
        testEntityManager.persistAndFlush(alissa);
        testEntityManager.persistAndFlush(sl);
        testEntityManager.persistAndFlush(taxiApplication);
        testEntityManager.persistAndFlush(travelTag);
    }

    @Test
    @DisplayName("Should find all curator")
    void itShouldFindAllCurators() {
        List<Curator> curatorList = curatorRepository.findAll();
        assertThat(curatorList).hasSize(2);
    }

    @Test
    @DisplayName("Should find curator by email")
    void itsShouldFindCuratorByEmail(){
        Optional<Curator> curator = curatorRepository.findCuratorByEmail(john.getEmail());
        assertThat(curator.get().getEmail().equals(john.getEmail()));
        assertThat(curator.get().getEmail()).isNotEqualTo(alissa.getEmail());
    }

    @Test
    @DisplayName("Should find curator by guid")
    void itsShouldFindCuratorByGuid(){
        Optional<Curator> curator = curatorRepository.findCuratorByGuid(john.getGuid());
        assertThat(curator.get().getGuid().equals(john.getGuid()));
        assertThat(curator.get().getGuid()).isNotEqualTo(alissa.getGuid());
    }

}
