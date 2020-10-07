package com.expleo.turistmo.turistmo.web;


import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.services.PackageService;
import java.util.Optional;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<?> getAllPackages(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) {
        try {
            Page<Package> packages = packageService.getPackages(page, size);
            return ResponseEntity.status(HttpStatus.OK).body(packages);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

//    @GetMapping()
//    public ResponseEntity<?> getPackageByCityId(@RequestParam(defaultValue = "0") Integer page,
//                                                @RequestParam(defaultValue = "10") Integer size,
//                                                @RequestParam UUID cityID) {
//        try {
//        Page<Package> packages = packageService.getPackages(page, size);
//        return ResponseEntity.status(HttpStatus.OK).body(packages);
//    } catch (Exception e) {
//        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
//    }
//}

}
