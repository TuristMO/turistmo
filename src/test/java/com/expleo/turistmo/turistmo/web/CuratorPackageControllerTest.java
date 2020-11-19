package com.expleo.turistmo.turistmo.web;

import com.expleo.turistmo.turistmo.TuristMoWebEnvironment;
import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.repository.PackageRepository;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import com.expleo.turistmo.turistmo.services.CuratorService;
import com.expleo.turistmo.turistmo.services.PackageService;
import com.expleo.turistmo.turistmo.web.request.SavePackageRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.doNothing;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TuristMoWebEnvironment
public class CuratorPackageControllerTest {

    @MockBean
    CuratorService curatorService;

    @InjectMocks
    CuratorController curatorController;

    @MockBean
    PackageRepository packageRepository;

    @MockBean
    PackageService packageService;

    @Captor
    ArgumentCaptor<String> stringCaptor;

    @Captor
    ArgumentCaptor<UUID> uuidCaptor;

    @Autowired
    MockMvc mockMvc;

    @MockBean
    TestEntityManager testEntityManager;

    Curator johnDoeCurator;

    Set<Package> packageList;
    Package stockholmPackage;
    Application sl;
    Application taxiApplication;
    Tag travelTag;

    DomainResource domainResource;

    @BeforeEach
    void setUp() {
        domainResource = new DomainResource();
        johnDoeCurator = domainResource.getJohnDoeCurator();
        stockholmPackage = domainResource.getStockholmPackage();
        sl = domainResource.getSLApplication();
        taxiApplication = domainResource.getTaxiApplication();
        travelTag = domainResource.getTravelTag();
        stockholmPackage.addTag(travelTag);
        stockholmPackage.addApplication(sl);
        stockholmPackage.addApplication(taxiApplication);
        stockholmPackage.setCurator(johnDoeCurator);
        packageList = Set.of(stockholmPackage);

        johnDoeCurator.setPackages(packageList);

    }


    @Test
    @DisplayName("It should return curator email and its packages.")
    @WithMockUser(username = "johdoe@gmail.com", password = "123321", authorities = "CURATOR")
    void itShouldReturnCuratorEmail() throws Exception {

        //GIVEN
        given(curatorService.findCuratorByEmail(anyString())).willReturn(johnDoeCurator);

        //WHEN
        this.mockMvc.perform(get("/api/v1/curator"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email", is(johnDoeCurator.getEmail())));

        //THEN
        then(curatorService).should().findCuratorByEmail(stringCaptor.capture());
        String captorEmail = stringCaptor.getValue();
        assertThat(johnDoeCurator.getEmail()).isEqualTo(captorEmail);
    }

    @Test
    @DisplayName("It should return curator packages by curator guid.")
    @WithMockUser(username = "johdoe@gmail.com", password = "123321", authorities = "CURATOR")
    void itShouldReturnCuratorPackages() throws Exception {

        //GIVEN
        given(curatorService.findPackagesFromCuratorByGuid(any())).willReturn(Set.of(johnDoeCurator.getPackages().toArray(new Package[0])));
        Set<Package> curatorPackages = curatorService.findPackagesFromCuratorByGuid(johnDoeCurator.getGuid());
        assertThat(curatorPackages).isNotNull();
        assertThat(johnDoeCurator.getPackages().size()).isEqualTo(1);

        //WHEN
        mockMvc.perform(get("/api/v1/curator"))
                .andExpect(status().isOk());

        //THEN
        then(curatorService).should().findPackagesFromCuratorByGuid(uuidCaptor.capture());
        assertThat(johnDoeCurator.getGuid()).isEqualTo(uuidCaptor.getValue());
    }

    @Test
    @DisplayName("It should save curator packages.")
    @WithMockUser(username = "johdoe@gmail.com", password = "123321", authorities = "CURATOR")
    void itShouldSaveCuratorPackages() throws Exception {

        //GIVEN
        given(curatorService.findCuratorByEmail(any())).willReturn(johnDoeCurator);
        doNothing().when(curatorService).saveCuratorPackages(any(),any());

        SavePackageRequest newPackage = domainResource.getStockholmPackageWithSavePackageRequest();

        //WHEN
        String json = new ObjectMapper().writeValueAsString(newPackage);
        mockMvc.perform(post("/api/v1/curator/save")
                .contentType(APPLICATION_JSON)
                .content(json))
                .andDo(print())
                .andExpect(status().isCreated());

        //THEN
        then(curatorService).should().findCuratorByEmail(stringCaptor.capture());
        String captorEmail = stringCaptor.getValue();
        assertThat(johnDoeCurator.getEmail()).isEqualTo(captorEmail);
    }
}
