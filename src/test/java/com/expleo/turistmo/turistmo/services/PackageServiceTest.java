package com.expleo.turistmo.turistmo.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.times;

import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.repository.PackageRepository;
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

    List<Package> packageList;

    @BeforeEach
    void setUp() {
        Package visiting_stockholm = Package.builder()
            .title("Visiting Stockholm")
            .build();

        packageList = List.of(visiting_stockholm);
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
        Page<Package> packages = new PageImpl<>(new ArrayList<Package>());
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


}


