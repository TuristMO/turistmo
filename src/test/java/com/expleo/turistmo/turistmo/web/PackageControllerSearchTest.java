package com.expleo.turistmo.turistmo.web;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.expleo.turistmo.turistmo.TuristMoWebEnvironment;
import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import com.expleo.turistmo.turistmo.services.PackageService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.web.servlet.MockMvc;

@TuristMoWebEnvironment
class PackageControllerSearchTest {

    @MockBean
    PackageService packageService;

    @Autowired
    MockMvc mockMvc;

    @Captor
    ArgumentCaptor<Integer> pageCaptor;
    @Captor
    ArgumentCaptor<Integer> sizeCaptor;
    @Captor
    ArgumentCaptor<String> stringCaptor;

    List<Package> packageList;
    Package stockholmPackage;
    Application sl;
    Application taxiApplication;
    Tag travelTag;


    @BeforeEach
    void setUp() {
        DomainResource domainResource = new DomainResource();
        stockholmPackage = domainResource.getStockholmPackage();
        sl = domainResource.getSLApplication();
        taxiApplication = domainResource.getTaxiApplication();
        travelTag = domainResource.getTravelTag();
        stockholmPackage.addTag(travelTag);
        stockholmPackage.addApplication(sl);
        stockholmPackage.addApplication(taxiApplication);
        packageList = List.of(stockholmPackage);
    }


    @Test
    @DisplayName("It should return page with packages based on searching for City.")
    void itShouldReturnPageWithPackagesBasedOnSearchForCity() throws Exception {
        //GIVEN
        Page<Package> packages = new PageImpl<>(packageList);
        given(packageService.getAllPackagesBasedOnSearch(any(Integer.class), any(Integer.class), anyString())).willReturn(packages);

        //WHEN
        mockMvc.perform(get("/api/v1/package")
            .param("page", String.valueOf(0))
            .param("size", String.valueOf(10))
            .param("search", "stockholm"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.totalElements", is(1)))
            .andDo(print());
        //THEN
        then(packageService).should().getAllPackagesBasedOnSearch(pageCaptor.capture(), sizeCaptor.capture(), stringCaptor.capture());
        Integer pageValueCaptured = pageCaptor.getValue();
        Integer sizeValueCaptured = sizeCaptor.getValue();
        String stringValueCaptured = stringCaptor.getValue();
        assertThat(pageValueCaptured).isEqualTo(0);
        assertThat(sizeValueCaptured).isEqualTo(10);
        assertThat(stringValueCaptured).isEqualTo("stockholm");
    }

    @Test
    @DisplayName("It should return page with packages based on searching for Tag.")
    void itShouldReturnPageWithPackagesBasedOnSearchForTag() throws Exception {
        //GIVEN
        Page<Package> packages = new PageImpl<>(packageList);
        given(packageService.getAllPackagesBasedOnSearch(any(Integer.class), any(Integer.class), anyString())).willReturn(packages);

        //WHEN
        mockMvc.perform(get("/api/v1/package")
            .param("page", String.valueOf(0))
            .param("size", String.valueOf(10))
            .param("search", "travel"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.totalElements", is(1)))
            .andDo(print());
        //THEN
        then(packageService).should().getAllPackagesBasedOnSearch(pageCaptor.capture(), sizeCaptor.capture(), stringCaptor.capture());
        Integer pageValueCaptured = pageCaptor.getValue();
        Integer sizeValueCaptured = sizeCaptor.getValue();
        String stringValueCaptured = stringCaptor.getValue();
        assertThat(pageValueCaptured).isEqualTo(0);
        assertThat(sizeValueCaptured).isEqualTo(10);
        assertThat(stringValueCaptured).isEqualTo("travel");
    }

    @Test
    @DisplayName("It should return page with packages based on searching for Application.")
    void itShouldReturnPageWithPackagesBasedOnSearchForApplication() throws Exception {
        //GIVEN
        Page<Package> packages = new PageImpl<>(packageList);
        given(packageService.getAllPackagesBasedOnSearch(any(Integer.class), any(Integer.class), anyString())).willReturn(packages);

        //WHEN
        mockMvc.perform(get("/api/v1/package/")
            .param("page", String.valueOf(0))
            .param("size", String.valueOf(10))
            .param("search", "sl"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.totalElements", is(1)))
            .andDo(print());
        //THEN
        then(packageService).should().getAllPackagesBasedOnSearch(pageCaptor.capture(), sizeCaptor.capture(), stringCaptor.capture());
        Integer pageValueCaptured = pageCaptor.getValue();
        Integer sizeValueCaptured = sizeCaptor.getValue();
        String stringValueCaptured = stringCaptor.getValue();
        assertThat(pageValueCaptured).isEqualTo(0);
        assertThat(sizeValueCaptured).isEqualTo(10);
        assertThat(stringValueCaptured).isEqualTo("sl");
    }
}
