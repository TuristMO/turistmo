package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ApplicationRepositoryTest {

    Application mockApplication;
    Application mockApplication2;

    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    ApplicationRepository applicationRepository;

    @BeforeEach
    void setUp() {
        Timestamp dateAsTimestamp = Timestamp.valueOf(LocalDateTime.now());
        mockApplication = Application.builder()
                .ios_link("SL_LINK_IOS")
                .guid(UUID.randomUUID())
                .android_link("SL_LINK_ANDROID")
                .logo("LOGO_URL2")
                .createdDate(dateAsTimestamp)
                .lastModifiedDate(dateAsTimestamp)
                .build();
        mockApplication2 = Application.builder()
                .ios_link("SL_LINK_IOS")
                .android_link("SL_LINK_ANDROID")
                .guid(UUID.randomUUID())
                .logo("LOGO_URL3")
                .createdDate(dateAsTimestamp)
                .lastModifiedDate(dateAsTimestamp)
                .build();
        testEntityManager.persistAndFlush(mockApplication);
        testEntityManager.persistAndFlush(mockApplication2);
    }

    @Test
    @DisplayName("Should find all applications")
    void itShouldFindAllApplications (){
        List<Application> applications = applicationRepository.findAll();
        assertThat(applications).hasSize(2);
    }

    @Test
    @DisplayName("Should find application by GUID")
    void itShouldFindApplicationsByGuid (){
        Page<Application> applications = applicationRepository.findApplicationsByGuid(mockApplication.getGuid(),
                                                                                      PageRequest.of(0, 10));
        assertThat(applications.getContent()).hasSize(1);
        assertThat(applications.get().findFirst().get().getGuid()).isEqualTo(mockApplication.getGuid());
    }

    @Test
    @DisplayName("Should not find application by GUID")
    void itShouldNotFindApplicationsByGuid (){
        Page<Application> applications = applicationRepository.findApplicationsByGuid(mockApplication.getGuid(),
                PageRequest.of(0, 10));
        assertThat(applications.getContent()).hasSize(1);
        assertThat(applications.get().findFirst().get().getGuid()).isNotEqualByComparingTo(mockApplication2.getGuid());
    }

}
