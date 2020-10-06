package com.expleo.turistmo.turistmo.web;


import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.services.PackageService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/package")
@RequiredArgsConstructor
public class PackageController {

    private final PackageService packageService;

    @GetMapping
    public ResponseEntity<?> getAllPackages(@RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size) {
        try {
            Page<Package> packages = packageService.getPackages(page.orElse(0), size.orElse(10));
            return ResponseEntity.status(HttpStatus.OK).body(packages);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

}
