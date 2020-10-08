package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class PackRepositoryTest {

    Application mockApplication;
    Application mockApplication2;

    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    PackageRepository packageRepository;

    @BeforeEach
    void setUp() {
        Timestamp dateAsTimestamp = Timestamp.valueOf(LocalDateTime.now());
        mockApplication = Application.builder()
                .ios_link("SL_LINK_IOS")
                .android_link("SL_LINK_ANDROID")
                .logo("LOGO_URL")
                .createdDate(dateAsTimestamp)
                .lastModifiedDate(dateAsTimestamp)
//                .id(1L)
                .build();
        mockApplication2 = Application.builder()
                .ios_link("SL_LINK_IOS")
                .android_link("SL_LINK_ANDROID")
                .logo("LOGO_URL")
                .createdDate(dateAsTimestamp)
                .lastModifiedDate(dateAsTimestamp)
//                .id(1L)
                .build();

        Package mockPackageStockholm = Package.builder()
                .city("Stockholm")
                .createdDate(dateAsTimestamp)
                .curator("John Doe")
                .lastModifiedDate(dateAsTimestamp)
                .curatorPicture("URL")
                .description("Something about Stockholm!")
                .tag("FUN,HAPPY")
                .title("Visiting Stockholm")
//                .id(1L)
                .build();

        Package mockPackageStockholm2 = Package.builder()
                .city("Stockholm")
                .createdDate(dateAsTimestamp)
                .curator("John Doe")
                .lastModifiedDate(dateAsTimestamp)
                .curatorPicture("URL")
                .description("Something about Stockholm!")
                .tag("FUN,HAPPY")
                .title("Visiting Stockholm")
//                .id(1L)
                .build();

        Package mockPackageGothenburg = Package.builder()
                .city("Göteborg")
                .createdDate(dateAsTimestamp)
                .curator("John Doe")
                .lastModifiedDate(dateAsTimestamp)
                .curatorPicture("URL")
                .description("Something about Götebrog!")
                .tag("FUN,HAPPY")
                .title("Visiting Göteborg")
//                .id(2L)
                .build();

        Package mockPackageMalmo = Package.builder()
                .city("Göteborg")
                .createdDate(dateAsTimestamp)
                .curator("John Doe")
                .lastModifiedDate(dateAsTimestamp)
                .curatorPicture("URL")
                .description("Something about Götebrog!")
                .tag("FUN,HAPPY")
                .title("Visiting Göteborg")
//                .id(2L)
                .build();

        mockPackageGothenburg.addApplication(mockApplication);
        mockPackageStockholm.addApplication(mockApplication);
        mockPackageStockholm2.addApplication(mockApplication);

        testEntityManager.persistAndFlush(mockApplication);
        testEntityManager.persistAndFlush(mockApplication2);
        testEntityManager.persistAndFlush(mockPackageGothenburg);
        testEntityManager.persistAndFlush(mockPackageStockholm);
        testEntityManager.persistAndFlush(mockPackageStockholm2);
        testEntityManager.persistAndFlush(mockPackageMalmo);
    }

    @Test
    void itShouldFindPackagesBelongingToCity (){
       Page<Package> stockPackage = packageRepository.findByCityIgnoreCase("stockholm", PageRequest.of(0,10));
       assertThat(stockPackage.getContent()).hasSize(2);
       stockPackage.getContent().forEach(aPackage -> assertThat(aPackage.getCity()).isEqualTo("Stockholm"));
    }

    @Test
    void itShouldNotFindPackagesBelongingToCity (){
       Page<Package> stockPackage = packageRepository.findByCityIgnoreCase("new york", PageRequest.of(2,10));
       assertThat(stockPackage.getContent()).hasSize(0);
    }

    @Test
    void itShouldFindPackagesContainingApplication (){
        Page<Package> stockPackage = packageRepository.findByUsefulApplications(mockApplication.getGuid(), PageRequest.of(0,10));
        assertThat(stockPackage.getContent()).hasSize(3);
        stockPackage.getContent().forEach(aPackage -> assertThat(aPackage.getUsefulApplications().contains(mockApplication)).isTrue());
    }

    @Test
    void itShouldNotFindPackagesContainingApplication (){
        Page<Package> stockPackage = packageRepository.findByUsefulApplications(mockApplication2.getGuid(), PageRequest.of(0,10));
        assertThat(stockPackage.getContent()).hasSize(0);
        stockPackage.getContent().forEach(aPackage -> assertThat(aPackage.getUsefulApplications().contains(mockApplication)).isFalse());
    }

}
