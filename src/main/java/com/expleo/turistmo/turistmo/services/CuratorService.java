package com.expleo.turistmo.turistmo.services;

import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.exception.EmailAlreadyExistsException;
import com.expleo.turistmo.turistmo.exception.PasswordMismatchException;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.web.request.SignUpRequest;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CuratorService {

    private final CuratorRepository curatorRepository;
    private final PasswordEncoder passwordEncoder;

    public Curator register(SignUpRequest signUpCurator) throws PasswordMismatchException {
        final String email = signUpCurator.getEmail();
        final String firstName = signUpCurator.getFirstName();
        final String lastName = signUpCurator.getLastName();
        Optional<Curator> curatorByEmail = curatorRepository.findCuratorByEmail(email);

        if (curatorByEmail.isPresent()) {
            throw new EmailAlreadyExistsException(String.format("Email %s is already taken!", email));
        }
        if (!signUpCurator.getConfirmPassword().contentEquals(signUpCurator.getPassword())) {
            throw new PasswordMismatchException(
                    String.format("Password %s doesn't match with your password confirmation %s!",
                            signUpCurator.getPassword(), signUpCurator.getConfirmPassword()));
        }
        String encodedPassword = passwordEncoder.encode(signUpCurator.getPassword());
        Curator newCuratorAccount = Curator.builder()
                .email(email)
                .password(encodedPassword)
                .firstName(firstName)
                .lastName(lastName)
                .build();
        return curatorRepository.save(newCuratorAccount);
    }

    public Curator findCuratorByEmail(String email){
        return curatorRepository
                .findCuratorByEmail(email)
                .orElseThrow(()->new NullPointerException("Unauthorized request!"));
    }

    public Curator findCuratorByGuid(UUID guid){
        return curatorRepository
                .findCuratorByGuid(guid)
                .orElseThrow(()->new NullPointerException("Unauthorized request!"));
    }

    public Set<Package> findPackagesFromCuratorByGuid(UUID guid){
        Curator curator = curatorRepository
                .findCuratorByGuid(guid)
                .orElseThrow(() -> new NullPointerException("Unauthorized request!"));

        return  curator.getPackages();
    }

    public void saveCuratorPackages(Curator curator, Package newPackage){
        Curator getCurator = curatorRepository
                .findCuratorByGuid(curator.getGuid())
                .orElseThrow(() -> new NullPointerException("Unauthorized request!"));

        newPackage.setCurator(getCurator);
        getCurator.addPackages(newPackage);
        curatorRepository.save(getCurator);
    }
}
