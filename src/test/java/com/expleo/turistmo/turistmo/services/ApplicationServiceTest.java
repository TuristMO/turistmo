package com.expleo.turistmo.turistmo.services;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.repository.ApplicationRepository;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.any;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class ApplicationServiceTest  {

    @Mock
    ApplicationRepository applicationRepository;

    @InjectMocks
    ApplicationService applicationService;

    @Captor
    ArgumentCaptor<Pageable> pageableCaptor;

    @Captor
    ArgumentCaptor<Application> applicationCaptor;

    @Captor
    ArgumentCaptor<String> stringCaptor;

    @Captor
    ArgumentCaptor<UUID> uuidCaptor;

    List<Application> applicationList;
    Application sl;

    DomainResource domainResource;

    @BeforeEach
    void setUp(){
        domainResource=new DomainResource();
        sl = domainResource.getSLApplication();
        applicationList = List.of(sl);
    }

    @Test
    @DisplayName("Should find application with page request.")
    void shouldFindApplicationWithPageRequest(){
        //GIVEN
        Page<Application> applicationPage = new PageImpl<>(applicationList);
        given(applicationRepository.findApplicationsByTitle(anyString(),any(Pageable.class)))
                .willReturn(applicationPage);
        //WHEN
        Page<Application> result = applicationService.getApplicationByTitle(0,2,"sl");
        //THEN
        then(applicationRepository).should(times(1))
                .findApplicationsByTitle(stringCaptor.capture(),pageableCaptor.capture());
        Pageable pageable = pageableCaptor.getValue();
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(pageable.getPageNumber()).isEqualTo(0);
        assertThat(pageable.getPageSize()).isEqualTo(2);
    }

    @Test
    @DisplayName("Should find all applications with page request.")
    void shouldFindAllApplicationsWithPageRequest(){
        //GIVEN
        Page<Application> applicationPage = new PageImpl<>(applicationList);
        given(applicationRepository.findAll(any(Pageable.class)))
                .willReturn(applicationPage);
        //WHEN
        Page<Application> result = applicationService.getAllApplications(0,2);
        //THEN
        then(applicationRepository).should(times(1))
                .findAll(pageableCaptor.capture());
        Pageable pageable = pageableCaptor.getValue();
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(pageable.getPageNumber()).isEqualTo(0);
        assertThat(pageable.getPageSize()).isEqualTo(2);
    }

}
