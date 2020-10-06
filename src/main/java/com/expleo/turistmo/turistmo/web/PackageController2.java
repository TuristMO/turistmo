package com.expleo.turistmo.turistmo.web;


import static org.springframework.http.HttpStatus.CREATED;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.repository.ApplicationRepository;
import com.expleo.turistmo.turistmo.repository.PackageRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
public class PackageController2 {


    // TODO EVERYTHING MUST BE MOVED TO THE BUSINESS LOGIC!
    //TODO BREAK DOWN THE CLASS IN A GOOD STRUCTURED WAY!
//    private final ApplicationRepository applicationRepository;
//    private final PackageRepository packageRepository;
//
//    @DeleteMapping("application/{id}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deleteApplication(@PathVariable Long id) {
//        applicationRepository.deleteById(id);
//    }
//
//    // METHODS CAN CHANGE LATER! WERE USED TO TEST IF THE REPOSITORY LAYER IS CORRECTLY CREATED
//    @PostMapping("/package/{packageId}/application/{appId}")
//    @ResponseStatus(CREATED)
//    public void addApplicationToPackage(@PathVariable Long packageId, @PathVariable Long appId) {
//        Package aPackage = packageRepository.findById(packageId)
//            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "BAD REQUEST"));
//        Application application = applicationRepository.findById(appId)
//            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "BAD REQUEST"));
//
//        if (aPackage.getUsefulApplications().contains(application)) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This applciation already exists in your package");
//        } else {
//            aPackage.addApplication(application);
//            packageRepository.save(aPackage);
//        }
//    }
//
//    @DeleteMapping("/package/{packageId}/application/{appId}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deleteApplicationFromPackage(@PathVariable Long packageId, @PathVariable Long appId) {
//        Package aPackage = packageRepository.findById(packageId)
//            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "BAD REQUEST"));
//        Application application = applicationRepository.findById(appId)
//            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "BAD REQUEST"));
//
//        if (aPackage.getUsefulApplications().contains(application)) {
//            aPackage.deleteApplication(application);
//            packageRepository.save(aPackage);
//        } else {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You dont have any application with that id");
//        }
//    }
//
//    @PostMapping("/package")
//    public ResponseEntity<?> createPackage(@RequestBody Package aPackage) {
//        Package savedPackage = packageRepository.save(aPackage);
//        return new ResponseEntity<>(savedPackage, CREATED);
//    }
//
//    @DeleteMapping("/package/{id}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deletePackageById(@PathVariable Long id) {
//        packageRepository.deleteById(id);
//    }
//
//    @GetMapping("/package/{id}")
//    public ResponseEntity<?> getPackageById(@PathVariable Long id) {
//        Optional<Package> byId = packageRepository.findById(id);
//        return ResponseEntity.status(HttpStatus.OK).body(byId.get());
//    }
//
//    @GetMapping("/packages")
//    public ResponseEntity<?> getAllPackages() {
//        return ResponseEntity.status(HttpStatus.OK).body(packageRepository.findAll());
//    }

}
