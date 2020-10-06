package com.expleo.turistmo.turistmo.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ApplicationTest extends BaseDomain {


    @Test
    @DisplayName("Application should be created with builder.")
    void itShouldCreateApplication() {
        Application application = mockApplication;
        assertThat(application).isNotNull();
        assertThat(application.getGuid()).isNotNull();
        assertThat(application.getPackages()).isNotNull();
        assertThat(application.toString()).isNotNull();
    }

    @Test
    @DisplayName("Should not equal applications.")
    void itShouldNotEqualApplication() {
        Application application = mockApplication;
        Application secondApplication = Application.builder().build();
        assertThat(application).isNotEqualTo(secondApplication);
    }

    @Test
    @DisplayName("Should equal applications.")
    void itShouldEqualApplication() {
        Application application = mockApplication;
        Application otherApplication = mockApplication;
        assertThat(application).isEqualTo(otherApplication);
    }
}
