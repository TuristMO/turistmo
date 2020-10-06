package com.expleo.turistmo.turistmo.repository;


import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.ANY;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;


@AutoConfigureTestDatabase(replace = ANY)
@SpringBootTest
@AutoConfigureMockMvc
public class BasePackageRepositoryTest {

    @Autowired
    ApplicationRepository applicationRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    MockMvc mockMvc;

    Package mockPackage;
    Application mockApplication;

    @BeforeEach
    void setUp() {
        mockPackage = Package.builder()
            .title("Hello There")
            .build();
        mockApplication = Application.builder()
            .logo("SL")
            .android_link("SL")
            .ios_link("SL")
            .build();
    }

}
