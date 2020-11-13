package com.expleo.turistmo.turistmo.web;

import com.expleo.turistmo.turistmo.TuristMoWebEnvironment;
import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import com.expleo.turistmo.turistmo.services.ApplicationService;
import com.expleo.turistmo.turistmo.services.TagService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TuristMoWebEnvironment
public class TagControllerTest {


    @MockBean
    TagService tagService;

    @Autowired
    MockMvc mockMvc;

    @Captor
    ArgumentCaptor<Integer> pageCaptor;
    @Captor
    ArgumentCaptor<Integer> sizeCaptor;

    List<Tag> tagsList;


    @BeforeEach
    void setUp() {
        DomainResource domainResource = new DomainResource();
        Tag foodTag = domainResource.getFoodTag();
        Tag travelTag = domainResource.getTravelTag();
        tagsList = List.of(foodTag,travelTag);
    }

    @Test
    @DisplayName("It should return page with all tags.")
    @WithMockUser(username = "johdoe@gmail.com", password = "123321", authorities = "CURATOR")
    void itShouldReturnPageWithAllTags() throws Exception {
        //GIVEN
        Page<Tag> tags = new PageImpl<>(tagsList);
        given(tagService.getAllTags(any(Integer.class), any(Integer.class))).willReturn(tags);

        //WHEN
        mockMvc.perform(get("/api/v1/tag")
                .param("page", String.valueOf(0))
                .param("size", String.valueOf(2)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements", is(2))) //Default value Stockholm
                .andDo(print());
        //THEN
        then(tagService).should().getAllTags(pageCaptor.capture(), sizeCaptor.capture());
        Integer pageValueCaptured = pageCaptor.getValue();
        Integer sizeValueCaptured = sizeCaptor.getValue();
        assertThat(pageValueCaptured).isEqualTo(0);
        assertThat(sizeValueCaptured).isEqualTo(2);
    }
}


