package com.expleo.turistmo.turistmo.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.expleo.turistmo.turistmo.resource.DomainResource;
import java.util.HashSet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PackageTest {

    DomainResource domainResource;

    @BeforeEach
    void setUp() {
        domainResource = new DomainResource();
    }

    @Test
    @DisplayName("Should create package with builder.")
    void itShouldCreatePackage() {
        Package stockholmPackage = domainResource.getStockholmPackage();
        assertThat(stockholmPackage).isNotNull();
        assertThat(stockholmPackage.getGuid()).isNotNull();
        assertThat(stockholmPackage.getUsefulApplications()).isNotNull();
        assertThat(stockholmPackage.toString()).isNotNull();
    }

    @Test
    @DisplayName("Should add application in package.")
    void itShouldAddApplication() {
        Package stockholmPackage = domainResource.getStockholmPackage();
        Application sl = domainResource.getSLApplication();
        stockholmPackage.addApplication(sl);
        assertThat(stockholmPackage.getUsefulApplications()).hasSize(1);
    }

    @Test
    @DisplayName("Should delete application from package.")
    void itShouldDeleteApplication() {
        Package stockholmPackage = domainResource.getStockholmPackage();
        stockholmPackage.setUsefulApplications(new HashSet<>());
        Application sl = domainResource.getSLApplication();
        sl.setPackages(new HashSet<>());
        stockholmPackage.addApplication(sl);
        assertThat(stockholmPackage.getUsefulApplications()).hasSize(1);
        stockholmPackage.deleteApplication(sl);
        assertThat(stockholmPackage.getUsefulApplications()).hasSize(0);
    }

    @Test
    @DisplayName("Should not equal packages")
    void itShouldNotEqualPackages() {
        Package stockholmPackage = domainResource.getStockholmPackage();
        Package emptyPackage = Package.builder().build();
        assertThat(stockholmPackage).isNotEqualTo(emptyPackage);
    }

    @Test
    @DisplayName("Should equal packages")
    void itShouldEqualPackages() {
        Package stockholmPackage = domainResource.getStockholmPackage();
        Package stockholmPackage2 = domainResource.getStockholmPackage();
        assertThat(stockholmPackage).isEqualTo(stockholmPackage2);
    }

}

















