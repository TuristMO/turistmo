package com.expleo.turistmo.turistmo.resource;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.domain.TokenType;
import com.expleo.turistmo.turistmo.domain.VerificationToken;
import com.expleo.turistmo.turistmo.web.request.SignUpRequest;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;
import java.util.UUID;


public class DomainResource {

    Timestamp dateAsTimestamp = Timestamp.valueOf(LocalDateTime.now());

    public Package getStockholmPackage() {
        return Package.builder()
            .city("Stockholm")
            .createdDate(dateAsTimestamp)
            .guid(UUID.randomUUID())
            .lastModifiedDate(dateAsTimestamp)
            .description("Something about Stockholm!")
            .tags(Set.of(getStockholmTag(),getCultureTag()))
            .title("Visiting Stockholm")
            .build();
    }

    public Package getGoteborgPackage() {
        return Package.builder()
            .city("Göteborg")
            .createdDate(dateAsTimestamp)
            .guid(UUID.randomUUID())
            .lastModifiedDate(dateAsTimestamp)
            .description("Something about Götebrog!")
            .tags(Set.of(getGoteborgTag(),getFoodTag(),getTravelTag()))
            .title("Visiting Göteborg")
            .build();
    }

    public Package getMalmoPackage() {
        return Package.builder()
            .city("Göteborg")
            .createdDate(dateAsTimestamp)
            .guid(UUID.randomUUID())
            .lastModifiedDate(dateAsTimestamp)
            .description("Something about Götebrog!")
            .tags(Set.of(getStockholmTag()))
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

    public Curator getJohnDoeCurator() {
        return Curator.builder()
            .avatarUrl("CURATOR_URL")
            .email("johdoe@gmail.com")
            .firstName("John")
            .lastName("Doe")
            .password("123321")
            .guid(UUID.randomUUID())
            .description("I am an software developer.")
            .build();
    }

    public Curator getAlissaMcarthyCurator() {
        return Curator.builder()
            .avatarUrl("CURATOR_URL")
            .email("alissamcarthygmail.com")
            .firstName("Alissa")
            .lastName("McCarthy")
            .guid(UUID.randomUUID())
            .password("123321")
            .description("Alissa is an influencer.")
            .build();
    }

    public Tag getStockholmTag() {
        return Tag.builder()
            .guid(UUID.randomUUID())
            .title("Stockholm").build();
    }

    public Tag getFoodTag() {
        return Tag.builder()
            .guid(UUID.randomUUID())
            .title("Food").build();
    }

    public Tag getCultureTag() {
        return Tag.builder()
            .guid(UUID.randomUUID())
            .title("Culture").build();
    }

    public Tag getGoteborgTag() {
        return Tag.builder()
            .guid(UUID.randomUUID())
            .title("Göteborg").build();
    }

    public Tag getTravelTag() {
        return Tag.builder()
            .guid(UUID.randomUUID())
            .title("Travel").build();
    }

    public SignUpRequest getSignUpRequest(){
        return new SignUpRequest("johdoe@gmail.com","123321","123321", "John","Doe");
    }

    public VerificationToken getVerificationToken(Curator curator,TokenType tokenType,Date date){
        return VerificationToken.builder()
            .token(UUID.randomUUID().toString())
            .curator(curator)
            .expiry(date)
            .createdDate(Timestamp.from(Instant.now()))
            .type(tokenType)
            .build();


    }

}
