package com.expleo.turistmo.turistmo.services;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public Page<Application> getApplicationByGuid(Integer page, Integer size, UUID uuid) {
        PageRequest pageable = PageRequest.of(page, size);
        return applicationRepository.findApplicationsByGuid(uuid, pageable);
    }

    public Page<Application> getApplicationByTitle(Integer page, Integer size, String title) {
        PageRequest pageable = PageRequest.of(page, size);
        return applicationRepository.findApplicationsByTitle(title, pageable);
    }
}
