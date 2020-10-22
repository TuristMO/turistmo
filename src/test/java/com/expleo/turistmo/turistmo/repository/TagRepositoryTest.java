package com.expleo.turistmo.turistmo.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.resource.DomainResource;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@DataJpaTest
public class TagRepositoryTest {

    Tag stockholmTag;
    Tag goteborgTag;
    Tag travelTag;

    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    TagRepository tagRepository;

    DomainResource domainResource;

    @BeforeEach
    void setUp() {
        domainResource = new DomainResource();
        stockholmTag = domainResource.getStockholmTag();
        goteborgTag = domainResource.getGoteborgTag();
        travelTag = domainResource.getTravelTag();

        testEntityManager.persistAndFlush(stockholmTag);
        testEntityManager.persistAndFlush(goteborgTag);
        testEntityManager.persistAndFlush(travelTag);
    }

    @Test
    @DisplayName("Should find all tags")
    void itShouldFindAllApplications() {
        List<Tag> tags = tagRepository.findAll();
        assertThat(tags).hasSize(3);
    }

    @Test
    @DisplayName("Should find tag by title")
    void itShouldFindApplicationsByTitle() {
        Page<Tag> tags = tagRepository.findTagByTitle(stockholmTag.getTitle(), PageRequest.of(0, 10));
        assertThat(tags).hasSize(1);
        assertThat(tags.get().findFirst().get().getTitle()).isEqualTo(stockholmTag.getTitle());
    }

    @Test
    @DisplayName("Should not find tag by title")
    void itShouldNotFindApplicationsByTitle() {
        Page<Tag> tags = tagRepository.findTagByTitle(stockholmTag.getTitle(), PageRequest.of(0, 10));
        assertThat(tags).hasSize(1);
        assertThat(tags.get().findFirst().get().getTitle()).isNotEqualTo(goteborgTag.getTitle());
    }
}
