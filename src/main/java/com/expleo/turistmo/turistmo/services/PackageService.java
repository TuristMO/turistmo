package com.expleo.turistmo.turistmo.services;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class PackageService {

    private final PackageRepository packageRepository;

    public Page<Package> getPackages(Integer page, Integer size) {
        PageRequest pageable = PageRequest.of(page, size);
        return packageRepository.findAll(pageable);
    }

    public Page<Package> getPackagesByApplication(Integer page, Integer size, Application application) {
        PageRequest pagable = PageRequest.of(page, size);
        return packageRepository.findAllByApplications(application, pagable);
    }

    public Page<Package> getPackagesByApplicationTitle(Integer page, Integer size, String applicationTitle) {
        PageRequest pagable = PageRequest.of(page, size);
        return packageRepository.findAllByApplicationTitle(applicationTitle, pagable);
    }

    public Page<Package> getPackagesByTag(Integer page, Integer size, Tag searchTerm) {
        PageRequest pagable = PageRequest.of(page, size);
        return packageRepository.findAllByTags(searchTerm, pagable);
    }

    public Page<Package> getPackagesByTagTitle(Integer page, Integer size, String searchTerm) {
        PageRequest pagable = PageRequest.of(page, size);
        return packageRepository.findAllByTagsTitle(searchTerm, pagable);
    }

    public Page<Package> getPackagesByCity(Integer page, Integer size, String city) {
        PageRequest pageable = PageRequest.of(page, size);
        return packageRepository.findByCity(city, pageable);
    }

    public Page<Package> getAllPackagesBasedOnSearch(Integer page, Integer size, String searchTerm){
        List<Package> packagesByTag = getPackagesByTagTitle(page, size, searchTerm).getContent();
        List<Package> packagesByApplication = getPackagesByApplicationTitle(page, size, searchTerm).getContent();
        List<Package> packagesByCity = getPackagesByCity(page, size, searchTerm).getContent();

        List<Package> collectedList = Stream.of(packagesByTag,packagesByApplication,packagesByCity)
                .flatMap(Collection::stream)
                .distinct()
                .collect(Collectors.toList());
        return new PageImpl<>(collectedList);
    }


}


