package com.expleo.turistmo.turistmo.repository;

import static org.assertj.core.api.Assertions.assertThat;

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@DataJpaTest
public class PackRepositoryTest extends DomainResource {

    Application sl;
    Application taxiApplication;
    Tag stockholmTag;

    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    PackageRepository packageRepository;

    @BeforeEach
    void setUp() {

        sl = getSLApplication();
        taxiApplication = getTaxiApplication();
        Curator johndoe = getJohnDoeCurator();
        Curator alyssa = getAlissaMcarthyCurator();

        stockholmTag = getStockholmTag();
        Tag gothenburgTag = getGoteborgTag();
        Tag cultureTag = getCultureTag();
        Tag travelTag = getTravelTag();
        Tag foodtag = getFoodTag();

        Package stockholmPackage = getStockholmPackage();
        Package stockholmPackage2 = getStockholmPackage();
        Package mockPackageGothenburg = getGoteborgPackage();
        Package mockPackageMalmo = getMalmoPackage();

        mockPackageGothenburg.addApplication(sl);
        stockholmPackage.addApplication(sl);
        stockholmPackage2.addApplication(sl);

        mockPackageGothenburg.addTag(gothenburgTag);
        mockPackageGothenburg.addTag(travelTag);
        mockPackageGothenburg.addTag(cultureTag);

        stockholmPackage.addTag(stockholmTag);
        stockholmPackage.addTag(travelTag);
        stockholmPackage.addTag(foodtag);

        stockholmPackage2.addTag(stockholmTag);
        stockholmPackage2.addTag(travelTag);
        stockholmPackage2.addTag(cultureTag);

        testEntityManager.persistAndFlush(stockholmTag);
        testEntityManager.persistAndFlush(cultureTag);
        testEntityManager.persistAndFlush(gothenburgTag);
        testEntityManager.persistAndFlush(foodtag);
        testEntityManager.persistAndFlush(travelTag);

        testEntityManager.persistAndFlush(sl);
        testEntityManager.persistAndFlush(taxiApplication);
        testEntityManager.persistAndFlush(johndoe);
        testEntityManager.persistAndFlush(mockPackageGothenburg);
        testEntityManager.persistAndFlush(stockholmPackage);
        testEntityManager.persistAndFlush(stockholmPackage2);
        testEntityManager.persistAndFlush(mockPackageMalmo);
    }

    @Test
    @DisplayName("Should find packages by city")
    void itShouldFindPackagesBelongingToCity() {
        Page<Package> stockPackage = packageRepository.findByCity("stockholm", PageRequest.of(0, 10));
        assertThat(stockPackage.getContent()).hasSize(2);
        stockPackage.getContent().forEach(aPackage -> assertThat(aPackage.getCity()).isEqualTo("Stockholm"));
    }

    @Test
    @DisplayName("Should not find packages by city")
    void itShouldNotFindPackagesBelongingToCity() {
        Page<Package> stockPackage = packageRepository.findByCity("new york", PageRequest.of(2, 10));
        assertThat(stockPackage.getContent()).hasSize(0);
    }


    @Test
    @DisplayName("Should find packages by application")
    void itShouldFindPackagesContainingApplication() {
        Page<Package> stockPackage = packageRepository.findAllByApplications(sl, PageRequest.of(0, 10));
        assertThat(stockPackage.getContent()).hasSize(3);
        stockPackage.getContent().forEach(aPackage -> assertThat(aPackage.getUsefulApplications().contains(sl)).isTrue());
    }

    @Test
    @DisplayName("Should not find packages by application")
    void itShouldNotFindPackagesContainingApplication() {
        Page<Package> stockPackage = packageRepository.findAllByApplications(taxiApplication, PageRequest.of(0, 10));
        assertThat(stockPackage.getContent()).hasSize(0);
        stockPackage.getContent().forEach(aPackage -> assertThat(aPackage.getUsefulApplications().contains(sl)).isFalse());
    }

    @Test
    @DisplayName("Should find packages by tag")
    void itShouldFindPackagesContainingTag() {
        Page<Package> stockPackage = packageRepository.findAllByTags(stockholmTag, PageRequest.of(0,10));
        assertThat(stockPackage.getContent()).hasSize(2);
        stockPackage.getContent().forEach(aPackage -> assertThat(aPackage.getCity()).isEqualTo("Stockholm"));
    }


    @Test
    @DisplayName("Should find packages by tag")
    void itShouldNotFindPackagesContainingTag() {
        Page<Package> stockPackage = packageRepository.findAllByTags(stockholmTag, PageRequest.of(0,10));
        assertThat(stockPackage.getContent()).hasSize(2);
        stockPackage.getContent().forEach(aPackage -> assertThat(aPackage.getCity()).isNotEqualTo("Göteborg"));
    }

}
