package com.expleo.turistmo.turistmo.web;

import com.expleo.turistmo.turistmo.web.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestingSec {

    @GetMapping("/secured")
    @PreAuthorize("hasAuthority('CURATOR')")
    public ResponseEntity<?> secured() {
        return ResponseEntity.status(HttpStatus.OK).body(new Response("Secured"));
    }

}
