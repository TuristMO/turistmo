package com.expleo.turistmo.turistmo.services;

import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.repository.PackageRepository;
import com.expleo.turistmo.turistmo.repository.TagRepository;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.any;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class TagServiceTest {
    @Mock
    TagRepository tagRepository;

    @InjectMocks
    TagService tagService;

    @Captor
    ArgumentCaptor<Pageable> pageableCaptor;

    @Captor
    ArgumentCaptor<String> stringCaptor;

    @Captor
    ArgumentCaptor<Tag> tagCaptor;

    List<Tag> tagList;
    Tag stockholmTag;
    DomainResource domainResource;

    @BeforeEach
    void setUp(){
        DomainResource domainResource = new DomainResource();
        stockholmTag = domainResource.getStockholmTag();
        tagList = List.of(stockholmTag);
    }

    @Test
    @DisplayName("Should find tags with page request.")
    void itShouldFindTagsWithPageRequest(){
        //GIVEN
        Page<Tag> tags = new PageImpl<>(tagList);
        given(tagRepository.findTagByTitle(anyString(),any(Pageable.class))).willReturn(tags);
        //WHEN
        Page<Tag> result = tagService.getTagByTitle(0,2, "stockholm");
        //THEN
        then(tagRepository).should(times(1))
                .findTagByTitle(stringCaptor.capture(),pageableCaptor.capture());
        Pageable pageable = pageableCaptor.getValue();
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(pageable.getPageNumber()).isEqualTo(0);
        assertThat(pageable.getPageSize()).isEqualTo(2);
    }

//    @Test
//    @DisplayName("Should not find tags with page request.")
//    void itShouldNotFindTagsWithPageRequest(){
//        //GIVEN
//        Page<Tag> tags = new PageImpl<>(tagList);
//        given(tagRepository.findTagByTitle(anyString(),any(Pageable.class))).willReturn(tags);
//        //WHEN
//        Page<Tag> result = tagService.getTagByTitle(0,2, "göteborg");
//        //THEN
//        then(tagRepository).should(times(1))
//                .findTagByTitle(stringCaptor.capture(),pageableCaptor.capture());
//        Pageable pageable = pageableCaptor.getValue();
//        assertThat(result.getTotalElements()).isEqualTo(1);
//        assertThat(pageable.getPageNumber()).isEqualTo(0);
//        assertThat(pageable.getPageSize()).isEqualTo(2);
//    }
}
