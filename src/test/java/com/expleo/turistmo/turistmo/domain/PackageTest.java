package com.expleo.turistmo.turistmo.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.expleo.turistmo.turistmo.resource.DomainResource;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PackageTest extends DomainResource {


    @Test
    @DisplayName("Should create package with builder.")
    void itShouldCreatePackage() {
        Package stockholmPackage = getStockholmPackage();
        assertThat(stockholmPackage).isNotNull();
        assertThat(stockholmPackage.getGuid()).isNotNull();
        assertThat(stockholmPackage.getUsefulApplications()).isNotNull();
        assertThat(stockholmPackage.toString()).isNotNull();
    }

    @Test
    @DisplayName("Should add application in package.")
    void itShouldAddApplication() {
        Package stockholmPackage = getStockholmPackage();
        Application sl = getSLApplication();
        stockholmPackage.addApplication(sl);
        assertThat(stockholmPackage.getUsefulApplications()).hasSize(1);
    }

    @Test
    @DisplayName("Should delete application from package.")
    void itShouldDeleteApplication() {
        Package stockholmPackage = getStockholmPackage();
        Application sl = getSLApplication();
        stockholmPackage.addApplication(sl);
        assertThat(stockholmPackage.getUsefulApplications()).hasSize(1);
        stockholmPackage.deleteApplication(sl);
        assertThat(stockholmPackage.getUsefulApplications()).hasSize(0);
    }

    @Test
    @DisplayName("Should not equal packages")
    void itShouldNotEqualPackages() {
        Package stockholmPackage = getStockholmPackage();
        Package emptyPackage = Package.builder().build();
        assertThat(stockholmPackage).isNotEqualTo(emptyPackage);
    }

    @Test
    @DisplayName("Should equal packages")
    void itShouldEqualPackages() {
        Package stockholmPackage = getStockholmPackage();
        Package stockholmPackage2 = getStockholmPackage();
        assertThat(stockholmPackage).isEqualTo(stockholmPackage2);
    }

}

















