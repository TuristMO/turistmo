package com.expleo.turistmo.turistmo.web;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.services.ApplicationService;
import com.expleo.turistmo.turistmo.services.PackageService;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.expleo.turistmo.turistmo.services.TagService;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/package")
@RequiredArgsConstructor
public class PackageController {

    private final PackageService packageService;

    @GetMapping
    public ResponseEntity<?> getAllPackages(@RequestParam(defaultValue = "0") Integer page,
                                            @RequestParam(defaultValue = "10") Integer size) {
        try {
            Page<Package> packages = packageService.getPackages(page, size);
            return ResponseEntity.status(HttpStatus.OK).body(packages);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    @GetMapping(value = "/search/{search}")
    public ResponseEntity<?> findPackagesBasedOnMostSearchHits(@RequestParam(defaultValue = "0") Integer page,
                                                               @RequestParam(defaultValue = "10") Integer size,
                                                               @PathVariable String search) {
        try {
            Page<Package> packages = packageService.getAllPackagesBasedOnSearch(page,size,search);
            return ResponseEntity.status(HttpStatus.OK).body(packages);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }


}
