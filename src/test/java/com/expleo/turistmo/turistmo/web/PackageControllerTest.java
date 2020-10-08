package com.expleo.turistmo.turistmo.web;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.services.PackageService;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@WebMvcTest(PackageController.class)
class PackageControllerTest {


    @MockBean
    PackageService packageService;

    @Autowired
    MockMvc mockMvc;

    @Captor
    ArgumentCaptor<Integer> pageCaptor;
    @Captor
    ArgumentCaptor<Integer> sizeCaptor;

    List<Package> packageList;

    @BeforeEach
    void setUp() {
        Package visiting_stockholm = Package.builder()
            .title("Visiting Stockholm")
            .build();
        packageList = List.of(visiting_stockholm);
    }


    @Test
    @DisplayName("It should return page with packages.")
    void itShouldReturnPageWithPackages() throws Exception {
        //GIVEN
        Page<Package> packages = new PageImpl<>(packageList);
        given(packageService.getPackages(any(Integer.class), any(Integer.class))).willReturn(packages);

        //WHEN
        mockMvc.perform(get("/api/v1/package")
            .param("page", String.valueOf(0))
            .param("size", String.valueOf(1)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.totalElements", is(1)))
            .andDo(print());
        //THEN
        then(packageService).should().getPackages(pageCaptor.capture(), sizeCaptor.capture());
        Integer pageValueCaptured = pageCaptor.getValue();
        Integer sizeValueCaptured = sizeCaptor.getValue();
        assertThat(pageValueCaptured).isEqualTo(0);
        assertThat(sizeValueCaptured).isEqualTo(1);
    }


    @Test
    @DisplayName("It should throw an exception when sending less than 0 as request param.")
    void itShouldThrowAnException() throws Exception {
        //GIVEN
        Page<Package> packages = new PageImpl<>(packageList);
        String errorMessage = "Page must be bigger or equal to 0.";
        given(packageService.getPackages(any(), any()))
            .willThrow(new IllegalArgumentException(errorMessage));

        //WHEN
        MvcResult mvcResult = mockMvc.perform(get("/api/v1/package")
            .param("page", String.valueOf(-10))
            .param("size", String.valueOf(1))
            .param("city", ""))
            .andExpect(status().isBadRequest())
            .andReturn();

        //THEN
        String returnedErrorMessage = mvcResult.getResponse().getErrorMessage();
        assertThat(returnedErrorMessage).isEqualTo(errorMessage);

    }




}
