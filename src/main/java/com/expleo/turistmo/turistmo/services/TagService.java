package com.expleo.turistmo.turistmo.services;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TagService {

    private final TagRepository tagRepository;

    public Page<Tag> getTagByTitle(Integer page, Integer size, String tagTitle) {
        PageRequest pageable = PageRequest.of(page, size);
        return tagRepository.findTagByTitle(tagTitle, pageable);
    }

    public Page<Tag> getAllTags(Integer page, Integer size) {
        PageRequest pageable = PageRequest.of(page, size);
        try {
            return tagRepository.findAll(pageable);
        } catch (Exception e) {
            throw new NullPointerException("Unauthorized request");
        }
    }
}
