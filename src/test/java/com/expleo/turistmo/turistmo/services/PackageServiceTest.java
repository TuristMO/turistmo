package com.expleo.turistmo.turistmo.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.times;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.repository.PackageRepository;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import java.util.ArrayList;
import java.util.List;
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


@ExtendWith(MockitoExtension.class)
class PackageServiceTest {

    @Mock
    PackageRepository packageRepository;
    @InjectMocks
    PackageService packageService;

    @Captor
    ArgumentCaptor<Pageable> pageableCaptor;

    @Captor
    ArgumentCaptor<Tag> tagCaptor;

    @Captor
    ArgumentCaptor<String> cityCaptor;

    @Captor
    ArgumentCaptor<Application> appCaptor;

    List<Package> packageList;
    Application sl;
    Package stockholmPackage;
    Tag stockholmTag;

    @BeforeEach
    void setUp() {
        DomainResource domainResource = new DomainResource();
        sl = domainResource.getSLApplication();
        stockholmPackage = domainResource.getStockholmPackage();
        stockholmTag = domainResource.getStockholmTag();
        packageList = List.of(stockholmPackage);
    }

    @Test
    @DisplayName("Should find package with page request.")
    void itShouldFindPackagesWithPageRequest() {
        //GIVEN
        Page<Package> packages = new PageImpl<>(packageList);
        given(packageRepository.findAll(any(Pageable.class))).willReturn(packages);
        //WHEN
        Page<Package> result = packageService.getPackages(0, 2);
        //THEN
        then(packageRepository).should(times(1)).findAll(pageableCaptor.capture());
        Pageable pageable = pageableCaptor.getValue();
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(pageable.getPageNumber()).isEqualTo(0);
        assertThat(pageable.getPageSize()).isEqualTo(2);
    }

    @Test
    @DisplayName("Should not find package with page request.")
    void itShouldNotFindPackagesWithPageRequest() {
        //GIVEN
        Page<Package> packages = new PageImpl<>(new ArrayList<>());
        given(packageRepository.findAll(any(Pageable.class))).willReturn(packages);
        //WHEN
        Page<Package> result = packageService.getPackages(0, 2);
        //THEN
        then(packageRepository).should(times(1)).findAll(pageableCaptor.capture());
        Pageable pageable = pageableCaptor.getValue();
        assertThat(result.getTotalElements()).isEqualTo(0);
        assertThat(pageable.getPageNumber()).isEqualTo(0);
        assertThat(pageable.getPageSize()).isEqualTo(2);
    }

    @Test
    @DisplayName("Should find package by city with page request.")
    void itShouldFindPackagesByCityWithPageRequest() {
        //GIVEN
        Page<Package> packages = new PageImpl<>(packageList);
        given(packageRepository.findByCity(anyString(), any(Pageable.class))).willReturn(packages);
        //WHEN
        Page<Package> result = packageService.getPackagesByCity(0, 2, "Stockholm");
        //THEN
        then(packageRepository).should(times(1))
            .findByCity(cityCaptor.capture(), pageableCaptor.capture());
        Pageable pageable = pageableCaptor.getValue();
        String city = cityCaptor.getValue();
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(pageable.getPageNumber()).isEqualTo(0);
        assertThat(pageable.getPageSize()).isEqualTo(2);
        assertThat(city).isEqualTo("Stockholm");
    }

    @Test
    @DisplayName("Should find package by application name with page request.")
        //todo Problems
    void itShouldFindPackagesByApplicationWithPageRequest() {
        //GIVEN
        Page<Package> packages = new PageImpl<>(packageList);
        given(packageRepository.findAllByApplications(any(Application.class), any(Pageable.class))).willReturn(packages);
        //WHEN
        Page<Package> result = packageService.getPackagesByApplication(0, 2, sl);
        //THEN
        then(packageRepository).should(times(1))
            .findAllByApplications(appCaptor.capture(), pageableCaptor.capture());
        Pageable pageable = pageableCaptor.getValue();
        Application application = appCaptor.getValue();
        assertThat(application).isNotNull();
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(pageable.getPageNumber()).isEqualTo(0);
        assertThat(pageable.getPageSize()).isEqualTo(2);
        assertThat(sl.getGuid()).isNotEqualTo("1");
    }

    @Test
    @DisplayName("Should find package by tag name with page request.")
        //todo Problems
    void itShouldFindPackagesByTagsWithPageRequest() {
        //GIVEN
        Page<Package> packages = new PageImpl<>(packageList);
        given(packageRepository.findAllByTags(any(Tag.class), any(Pageable.class))).willReturn(packages);
        //WHEN
        Page<Package> result = packageService.getPackagesByTag(0, 2, stockholmTag);
        //THEN
        then(packageRepository).should(times(1))
            .findAllByTags(tagCaptor.capture(), pageableCaptor.capture());
        Pageable pageable = pageableCaptor.getValue();
        Tag stockholmTag = tagCaptor.getValue();
        assertThat(stockholmTag).isNotNull();
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(pageable.getPageNumber()).isEqualTo(0);
        assertThat(pageable.getPageSize()).isEqualTo(2);
        assertThat(sl.getGuid()).isNotEqualTo("1");
    }
}


