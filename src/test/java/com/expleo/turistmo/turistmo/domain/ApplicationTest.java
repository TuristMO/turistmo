package com.expleo.turistmo.turistmo.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.expleo.turistmo.turistmo.resource.DomainResource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ApplicationTest {

    DomainResource domainResource;

    @BeforeEach
    void setUp() {
        domainResource = new DomainResource();
    }

    @Test
    @DisplayName("Application should be created with builder.")
    void itShouldCreateApplication() {
        Package pack = domainResource.getStockholmPackage();
        Application application = domainResource.getSLApplication();
        assertThat(application).isNotNull();
        assertThat(application.getGuid()).isNotNull();
        assertThat(application.toString()).isNotNull();
    }

    @Test
    @DisplayName("Should not equal applications.")
    void itShouldNotEqualApplication() {
        Application sl = domainResource.getSLApplication();
        Application taxi = domainResource.getTaxiApplication();
        assertThat(sl).isNotEqualTo(taxi);
    }

    @Test
    @DisplayName("Should equal applications.")
    void itShouldEqualApplication() {
        Application sl = domainResource.getSLApplication();
        Application copySl = domainResource.getSLApplication();
        assertThat(sl).isEqualTo(copySl);
    }
}
