package com.expleo.turistmo.turistmo.web;


import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.services.CuratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/curator")
@RequiredArgsConstructor
public class CuratorController {

    private final CuratorService curatorService;
    //få alla paket som tillhör curator

    @GetMapping
    @PreAuthorize("hasAuthority('CURATOR')")
    public ResponseEntity<?> getAllPackagesBelongingToCurator(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            Curator curator = curatorService.findCuratorByEmail(email);
            return ResponseEntity.status(HttpStatus.OK).body(curator);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    //skapa ett paket

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('CURATOR')")
    public ResponseEntity<?> savePackagesBelongingToCurator(@RequestBody Package savePackage){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
             Curator curator = curatorService.findCuratorByEmail(email);
             curatorService.saveCuratorPackages(curator,savePackage);
            return ResponseEntity.status(HttpStatus.CREATED).body(curator);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    //ta bort ett paket

    //redigera paket
}
