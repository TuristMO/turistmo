package com.expleo.turistmo.turistmo.domain;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;

public class BaseDomain {

    Application mockApplication;
    Package mockPackage;

    @BeforeEach
    void setUp() {
        Timestamp dateAsTimestamp = Timestamp.valueOf(LocalDateTime.now());
        mockApplication = Application.builder()
            .ios_link("SL_LINK_IOS")
            .android_link("SL_LINK_ANDROID")
            .logo("LOGO_URL")
            .createdDate(dateAsTimestamp)
            .lastModifiedDate(dateAsTimestamp)
            .id(1L)
            .build();

        mockPackage = Package.builder()
            .city("Stockholm")
            .createdDate(dateAsTimestamp)
            .curator("John Doe")
            .lastModifiedDate(dateAsTimestamp)
            .curatorPicture("URL")
            .description("Something about Stockholm!")
            .tag("FUN,HAPPY")
            .title("Visiting Stockholm")
            .id(1L)
            .build();

    }


}
