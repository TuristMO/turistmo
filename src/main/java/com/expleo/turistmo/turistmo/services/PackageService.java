package com.expleo.turistmo.turistmo.services;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PackageService {

    private final PackageRepository packageRepository;

    public Page<Package> getPackages(Integer page, Integer size) {
        PageRequest pageable = PageRequest.of(page, size);
        return packageRepository.findAll(pageable);
    }

    public Page<Package> getPackagesByCity(Integer page, Integer size, String city) {
        PageRequest pagable = PageRequest.of(page, size);
        return packageRepository.findByCityIgnoreCase(city, pagable);
    }

    public Page<Package> getPackagesByApplication(Integer page, Integer size, Application application) {
        PageRequest pagable = PageRequest.of(page, size);
        return packageRepository.findAllByApplications(application, pagable);
    }
}


