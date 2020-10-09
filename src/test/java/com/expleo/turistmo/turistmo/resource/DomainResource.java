package com.expleo.turistmo.turistmo.resource;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;


public class DomainResource {

    Timestamp dateAsTimestamp = Timestamp.valueOf(LocalDateTime.now());

    public Package getStockholmPackage() {
        return Package.builder()
            .city("Stockholm")
            .createdDate(dateAsTimestamp)
            .curator("John Doe")
            .guid(UUID.randomUUID())
            .lastModifiedDate(dateAsTimestamp)
            .curatorPicture("URL")
            .description("Something about Stockholm!")
            .tag("FUN,HAPPY")
            .title("Visiting Stockholm")
            .build();
    }

    public Package getGoteborgPackage() {
        return Package.builder()
            .city("Göteborg")
            .createdDate(dateAsTimestamp)
            .curator("John Doe")
            .guid(UUID.randomUUID())
            .lastModifiedDate(dateAsTimestamp)
            .curatorPicture("URL")
            .description("Something about Götebrog!")
            .tag("FUN,HAPPY")
            .title("Visiting Göteborg")
            .build();
    }

    public Package getMalmoPackage() {
        return Package.builder()
            .city("Göteborg")
            .createdDate(dateAsTimestamp)
            .curator("John Doe")
            .guid(UUID.randomUUID())
            .lastModifiedDate(dateAsTimestamp)
            .curatorPicture("URL")
            .description("Something about Götebrog!")
            .tag("FUN,HAPPY")
            .title("Visiting Göteborg")
            .build();
    }

    public Application getSLApplication(){
        return Application.builder()
            .title("SL")
            .ios_link("SL_LINK_IOS")
            .android_link("SL_LINK_ANDROID")
            .guid(UUID.randomUUID())
            .logo("LOGO_URL3")
            .createdDate(dateAsTimestamp)
            .lastModifiedDate(dateAsTimestamp)
            .build();
    }

    public Application getTaxiApplication(){
        return Application.builder()
            .title("Taxi")
            .ios_link("TAXI_LINK_IOS")
            .guid(UUID.randomUUID())
            .android_link("TAXI_LINK_ANDROID")
            .logo("LOGO_URL2")
            .createdDate(dateAsTimestamp)
            .lastModifiedDate(dateAsTimestamp)
            .build();
    }

}
