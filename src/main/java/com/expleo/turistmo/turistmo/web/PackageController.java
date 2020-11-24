package com.expleo.turistmo.turistmo.web;

import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.services.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/package")
@RequiredArgsConstructor
public class PackageController {

    private final PackageService packageService;

    @GetMapping
    public ResponseEntity<?> findPackageByGuid(@RequestParam(defaultValue = "0") Integer page,
                                               @RequestParam(defaultValue = "10") Integer size,
                                               @RequestParam(defaultValue = "Stockholm") String search) {
        try {
            Page<Package> packages = packageService.getAllPackagesBasedOnSearch(page, size, search);
            return ResponseEntity.status(HttpStatus.OK).body(packages);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @GetMapping("/packageguid")
    public ResponseEntity<?> findPackageByGuid(@RequestParam UUID packageGuid) {
        try {
            Package foundPackage = packageService.getPackageByGuid(packageGuid);
            return ResponseEntity.status(HttpStatus.OK).body(foundPackage);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/curatorguid")
    public ResponseEntity<?> findPackagesByCuratorGuid(@RequestParam(defaultValue = "0") Integer page,
                                                       @RequestParam(defaultValue = "10") Integer size,
                                                       @RequestParam UUID curatorGuid) {
        try {
            Page<Package> packages = packageService.getAllPackagesByCuratorGuid(page,size,curatorGuid);
            return ResponseEntity.status(HttpStatus.OK).body(packages);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
