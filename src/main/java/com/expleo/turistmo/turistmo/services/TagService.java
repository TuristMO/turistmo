package com.expleo.turistmo.turistmo.services;

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
}
