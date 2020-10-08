package com.expleo.turistmo.turistmo.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;


class PackageRepositoryTest extends BasePackageRepositoryTest {

    @Disabled
    @Test
    @DisplayName("It should create package.")
    void itShouldCreatePackage() throws Exception {
        String json = new ObjectMapper().writeValueAsString(mockPackageStockholm);
        mockMvc.perform(post("/package")
            .contentType(APPLICATION_JSON)
            .content(json))
            .andDo(print())
            .andExpect(jsonPath("$.title", is(mockPackageStockholm.getTitle())))
            .andExpect(status().isCreated());
    }

    @Disabled
    @DisplayName("It should find package by id.")
    @Test
    void itShouldFindPackageById() throws Exception {
        Package savedPackage = packageRepository.save(mockPackageStockholm);
        mockMvc.perform(get("/package/{id}", savedPackage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON))
            .andExpect(jsonPath("$.title", is(mockPackageStockholm.getTitle())))
            .andDo(print());
    }

    @Disabled
    @Test
    @DisplayName("It should delete a package.")
    void itShouldDeletePackage() throws Exception {
        Package savedPackage = packageRepository.save(mockPackageStockholm);

        mockMvc.perform(delete("/package/{id}", savedPackage.getId()))
            .andExpect(status().isNoContent())
            .andDo(print());
    }

    @Disabled
    @Test
    @DisplayName("It should delete application")
    void itShouldDeleteApplication() throws Exception {
        Application savedApplication = applicationRepository.save(mockApplication);
        mockMvc.perform(delete("/application/{id}", savedApplication.getId()))
            .andExpect(status().isNoContent())
            .andDo(print());
        assertThat(applicationRepository.findAll()).hasSize(4); // 4 BECAUSE SPRING CONTEXT INITIALIZES COMMANDLINERUNNES ALSO.
    }

    @Disabled
    @Test
    @DisplayName("It should delete an application inside a package when one application gets deleted.")
    void itShouldDeleteApplicationInsideAPackageWhenTheApplicationIsDeleted() throws Exception {

        Package savedPackage = packageRepository.save(mockPackageStockholm);
        Application savedApplication = applicationRepository.save(mockApplication);
        savedPackage.addApplication(savedApplication);
        Package packageWithOneApplication = packageRepository.save(savedPackage);

        mockMvc.perform(delete("/application/{id}", savedApplication.getId()))
            .andExpect(status().isNoContent())
            .andDo(print());


        mockMvc.perform(get("/package/{id}", packageWithOneApplication.getId())
            .accept(APPLICATION_JSON))
            .andExpect(
                jsonPath("$.usefulApplications", hasSize(0)))   // use $ if the returned value is an array.// $.[0].firstName gets the first index (object)
            .andExpect(status().isOk());
    }
    @Disabled
    @Test
    @DisplayName("It should delete one application from the package.")
    void itShouldDeleteOneApplicationFromThePackage() throws Exception {
        Package savedPackage = packageRepository.save(mockPackageStockholm);
        Application savedApplication = applicationRepository.save(mockApplication);

        savedPackage.addApplication(savedApplication);
        Package packageWithOneApplication = packageRepository.save(savedPackage);

        mockMvc.perform(
            delete(
            "/package/{packageId}/application/{appId}",
            packageWithOneApplication.getId(),savedApplication.getId()))
            .andExpect(status().isNoContent())
            .andDo(print());
        Optional<Package> packageById = packageRepository.findById(packageWithOneApplication.getId());
        Package aPackage = packageById.get();
        assertThat(aPackage.getUsefulApplications()).hasSize(0);
    }

    @Test
    @DisplayName("It should find packages based on city")
    void itShouldFindPackagesByCity () {
        Package savedPackage = packageRepository.save(mockPackageStockholm);
        Package savedPackage2 = packageRepository.save(mockPackageGothenburg);
        Application savedApplication = applicationRepository.save(mockApplication);

        savedPackage.addApplication(savedApplication);
        savedPackage2.addApplication(savedApplication);

    }

    @Test
    @DisplayName("It should find packages based on city")
    void itShouldFindPackagesByApplication () {
        Package savedPackage = packageRepository.save(mockPackageStockholm);
        Package savedPackage2 = packageRepository.save(mockPackageGothenburg);
        Application savedApplication = applicationRepository.save(mockApplication);

        savedPackage.addApplication(savedApplication);
        savedPackage2.addApplication(savedApplication);



    }
}
