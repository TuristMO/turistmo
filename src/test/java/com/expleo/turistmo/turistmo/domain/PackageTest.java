package com.expleo.turistmo.turistmo.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PackageTest extends BaseDomain {


    @Test
    @DisplayName("Should create package with builder.")
    void itShouldCreatePackage() {
        Package aPackage = mockPackage;
        assertThat(aPackage).isNotNull();
        assertThat(aPackage.getGuid()).isNotNull();
        assertThat(aPackage.getUsefulApplications()).isNotNull();
        assertThat(aPackage.toString()).isNotNull();
    }

    @Test
    @DisplayName("Should add application in package.")
    void itShouldAddApplication() {
        Package aPackage = mockPackage;
        aPackage.addApplication(mockApplication);
        assertThat(aPackage.getUsefulApplications()).hasSize(1);
    }

    @Test
    @DisplayName("Should delete application from package.")
    void itShouldDeleteApplication() {
        Package aPackage = mockPackage;
        aPackage.addApplication(mockApplication);
        assertThat(aPackage.getUsefulApplications()).hasSize(1);
        aPackage.deleteApplication(mockApplication);
        assertThat(aPackage.getUsefulApplications()).hasSize(0);
    }

    @Test
    @DisplayName("Should not equal packages")
    void itShouldNotEqualPackages() {
        Package aPackage = mockPackage;
        Package secondPackage = Package.builder().build();
        assertThat(aPackage).isNotEqualTo(secondPackage);
    }

    @Test
    @DisplayName("Should equal packages")
    void itShouldEqualPackages() {
        Package aPackage = mockPackage;
        Package otherPackage = mockPackage;
        assertThat(aPackage).isEqualTo(otherPackage);
    }

}

















