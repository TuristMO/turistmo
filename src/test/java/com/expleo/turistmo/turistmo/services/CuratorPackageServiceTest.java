package com.expleo.turistmo.turistmo.services;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.repository.PackageRepository;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class CuratorPackageServiceTest {

    @Mock
    CuratorRepository curatorRepository;

    @Mock
    PackageRepository packageRepository;

    @InjectMocks
    CuratorService curatorService;

    Curator johnDoeCurator;

    Set<Package> packageList;
    Set<Package> newPackageList;
    Package stockholmPackage;
    Application sl;
    Application taxiApplication;
    Tag travelTag;

    DomainResource domainResource;

    Timestamp dateAsTimestamp = Timestamp.valueOf(LocalDateTime.now());

    @BeforeEach
    void setUp() {
        domainResource = new DomainResource();
        johnDoeCurator = domainResource.getJohnDoeCurator();
//        johnDoeCurator.setGuid(UUID.randomUUID());
        stockholmPackage = domainResource.getStockholmPackage();
        sl = domainResource.getSLApplication();
        taxiApplication = domainResource.getTaxiApplication();
        travelTag = domainResource.getTravelTag();
        stockholmPackage.addTag(travelTag);
        stockholmPackage.addApplication(sl);
        stockholmPackage.addApplication(taxiApplication);
        stockholmPackage.setCurator(johnDoeCurator);
        packageList = Set.of(stockholmPackage);
        johnDoeCurator.setPackages(packageList);

    }

    @Test
    @DisplayName("It should get curator email.")
    void itShouldGetEmailFromCurator() {
        given(curatorRepository.findCuratorByEmail(anyString())).willReturn(Optional.of(johnDoeCurator));
        Curator curator = curatorService.findCuratorByEmail(johnDoeCurator.getEmail());
        assertThat(curatorService.findCuratorByEmail(johnDoeCurator.getEmail()).equals(curator.getEmail()));
        assertThat(curator).isNotNull();

    }

    @Test
    @DisplayName("It should get packages from curator.")
    void itShouldGetPackagesFromCurator() {
        given(curatorRepository.findCuratorByGuid(any())).willReturn(Optional.of(johnDoeCurator));
        Set<Package> curatorSet = curatorService.findPackagesFromCuratorByGuid(johnDoeCurator.getGuid());
        assertThat(curatorSet).isNotNull();
        assertThat(johnDoeCurator.getPackages()).hasSize(1);
    }

    @Test
    @DisplayName("It should throw an exceptions.")
    void itShouldThrowAnException() {
        given(curatorRepository.findCuratorByGuid(any())).willReturn(Optional.empty());
        assertThatThrownBy(() -> curatorService.findPackagesFromCuratorByGuid(johnDoeCurator.getGuid()))
                .isInstanceOf(NullPointerException.class)
                .hasMessage("Unauthorized request!");
    }

    @Test
    @DisplayName("It should save a package to curator")
    void istShouldSavePackageToCurator() {
        johnDoeCurator.setPackages(new HashSet<>());
        given(curatorRepository.findCuratorByGuid(any())).willReturn(Optional.of(johnDoeCurator));

        Package pack = domainResource.getStockholmPackage();
        pack.setCity("New Stockholm");
        pack.setCreatedDate(dateAsTimestamp);
        pack.setGuid(UUID.randomUUID());
        pack.setLastModifiedDate(dateAsTimestamp);
        pack.setDescription("Something about new Stockholm!");
        pack.addTag(travelTag);
        pack.setTitle("Visiting New Stockholm");
        pack.addApplication(sl);
        pack.addApplication(taxiApplication);
        pack.setCurator(johnDoeCurator);


        curatorService.saveCuratorPackages(johnDoeCurator,pack);

        Optional<Curator> getCuratorPack = curatorRepository.findCuratorByGuid(johnDoeCurator.getGuid());

        assertThat(getCuratorPack.get().getPackages()).hasSize(1);

    }

    @Test
    @DisplayName("It should throw an Unauthorized request.")
    void itShouldThrowAnUnauthorizedWhenTryToSave() {
        given(curatorRepository.findCuratorByGuid(any())).willReturn(Optional.empty());
        Package pack = new Package();
        pack.setCity("New Stockholm");
        pack.setCreatedDate(dateAsTimestamp);
        pack.setGuid(UUID.randomUUID());
        pack.setCurator(johnDoeCurator);
        pack.setLastModifiedDate(dateAsTimestamp);
        pack.setDescription("Something about Stockholm!");
        pack.setTags(Set.of(domainResource.getStockholmTag(), domainResource.getCultureTag()));
        pack.setTitle("Visiting New Stockholm");
        pack.addApplication(sl);
        pack.addApplication(taxiApplication);
        newPackageList = Set.of(pack);
        assertThatThrownBy(() -> curatorService.saveCuratorPackages(johnDoeCurator,pack))
                .isInstanceOf(NullPointerException.class)
                .hasMessage("Unauthorized request!");
    }
}
