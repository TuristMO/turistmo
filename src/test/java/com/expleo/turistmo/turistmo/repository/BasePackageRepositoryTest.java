//package com.expleo.turistmo.turistmo.repository;
//
//
//import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.ANY;
//
//import com.expleo.turistmo.turistmo.domain.Application;
//import com.expleo.turistmo.turistmo.domain.Package;
//import org.junit.jupiter.api.BeforeEach;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.sql.Timestamp;
//import java.time.LocalDateTime;
//
//
//@AutoConfigureTestDatabase(replace = ANY)
//@SpringBootTest
//@AutoConfigureMockMvc
//public class BasePackageRepositoryTest {
//
//    @Autowired
//    ApplicationRepository applicationRepository;
//    @Autowired
//    PackageRepository packageRepository;
//    @Autowired
//    MockMvc mockMvc;
//
//    Package mockPackageStockholm;
//    Package mockPackageGothenburg;
//    Application mockApplication;
//
//    @BeforeEach
//    void setUp() {
//        Timestamp dateAsTimestamp = Timestamp.valueOf(LocalDateTime.now());
//        mockApplication = Application.builder()
//                .ios_link("SL_LINK_IOS")
//                .android_link("SL_LINK_ANDROID")
//                .logo("LOGO_URL-BASEPACKAGEREPO")
//                .createdDate(dateAsTimestamp)
//                .lastModifiedDate(dateAsTimestamp)
//                .id(1L)
//                .build();
//
//        mockPackageStockholm = Package.builder()
//                .city("Stockholm")
//                .createdDate(dateAsTimestamp)
//                .curator("John Doe")
//                .lastModifiedDate(dateAsTimestamp)
//                .curatorPicture("URL")
//                .description("Something about Stockholm!")
//                .tag("FUN,HAPPY")
//                .title("Visiting Stockholm")
//                .id(1L)
//                .build();
//
//        mockPackageGothenburg = Package.builder()
//                .city("Göteborg")
//                .createdDate(dateAsTimestamp)
//                .curator("John Doe")
//                .lastModifiedDate(dateAsTimestamp)
//                .curatorPicture("URL")
//                .description("Something about Götebrog!")
//                .tag("FUN,HAPPY")
//                .title("Visiting Göteborg")
//                .id(2L)
//                .build();
//    }
//}
