package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ApplicationRepositoryTest extends DomainResource {

    Application sl;
    Application sl2;

    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    ApplicationRepository applicationRepository;

    @BeforeEach
    void setUp() {
        sl = getSLApplication();
        sl2 = getSLApplication();
        testEntityManager.persistAndFlush(sl);
        testEntityManager.persistAndFlush(sl2);
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
        Page<Application> applications = applicationRepository.findApplicationsByGuid(sl.getGuid(),
                                                                                      PageRequest.of(0, 10));
        assertThat(applications).hasSize(1);
        assertThat(applications.get().findFirst().get().getGuid()).isEqualTo(sl.getGuid());
    }

    @Test
    @DisplayName("Should not find application by GUID")
    void itShouldNotFindApplicationsByGuid (){
        Page<Application> applications = applicationRepository.findApplicationsByGuid(sl.getGuid(),
                PageRequest.of(0, 10));
        assertThat(applications).hasSize(1);
        assertThat(applications.get().findFirst().get().getGuid()).isNotEqualByComparingTo(sl2.getGuid());
    }

}
