package com.expleo.turistmo.turistmo.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.expleo.turistmo.turistmo.resource.DomainResource;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ApplicationTest extends DomainResource {


    @Test
    @DisplayName("Application should be created with builder.")
    void itShouldCreateApplication() {
        Package pack = getStockholmPackage();
        Application application = getSLApplication();
        assertThat(application).isNotNull();
        assertThat(application.getGuid()).isNotNull();
        assertThat(application.toString()).isNotNull();
    }

    @Test
    @DisplayName("Should not equal applications.")
    void itShouldNotEqualApplication() {
        Application sl = getSLApplication();
        Application taxi = getTaxiApplication();
        assertThat(sl).isNotEqualTo(taxi);
    }

    @Test
    @DisplayName("Should equal applications.")
    void itShouldEqualApplication() {
        Application sl = getSLApplication();
        Application copySl = getSLApplication();
        assertThat(sl).isEqualTo(copySl);
    }
}
