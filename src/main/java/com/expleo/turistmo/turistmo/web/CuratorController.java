package com.expleo.turistmo.turistmo.web;


import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.services.CuratorService;
import com.expleo.turistmo.turistmo.web.request.SavePackageRequest;
import com.expleo.turistmo.turistmo.web.response.PackageResponse;
import com.expleo.turistmo.turistmo.web.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

import java.util.UUID;
import java.util.logging.Logger;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/v1/curator")
@RequiredArgsConstructor
public class CuratorController {

    private final CuratorService curatorService;
    //få alla paket som tillhör curator

    @GetMapping
    @PreAuthorize("hasAuthority('CURATOR')")
    public ResponseEntity<?> getAllPackagesBelongingToCurator() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            Curator curator = curatorService.findCuratorByEmail(email);
            return ResponseEntity.status(HttpStatus.OK).body(curator);
        } catch (Exception e) {
            throw new ResponseStatusException(BAD_REQUEST, e.getMessage());
        }
    }

    //skapa ett paket

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('CURATOR')")
    public ResponseEntity<?> savePackagesBelongingToCurator(@Valid @RequestBody Package savePackage) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            Curator curator = curatorService.findCuratorByEmail(email);
            Curator savedCurator = curatorService.saveCuratorPackages(curator, savePackage);
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedCurator);
            return new ResponseEntity<>(
                    new Response("Package is created successfully!"),
                    CREATED);
        } catch (Exception e) {
            throw new ResponseStatusException(BAD_REQUEST, e.getMessage());
        }
    }

    //ta bort ett paket
    @DeleteMapping("/delete")
    @PreAuthorize("hasAuthority('CURATOR')")
    public ResponseEntity<?> deletePackageBelongingToCurator(Package deletePackage) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            Curator findCurator = curatorService.findCuratorByEmail(email);
            curatorService.deleteCuratorPackageFromPackageGuid(findCurator.getGuid(), deletePackage.getGuid());
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            throw new ResponseStatusException(BAD_REQUEST, e.getMessage());
        }
    }

    //redigera paket
}
