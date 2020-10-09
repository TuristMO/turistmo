package com.expleo.turistmo.turistmo.IT;

import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.ANY;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.AUTO_CONFIGURED;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.repository.ApplicationRepository;
import com.expleo.turistmo.turistmo.repository.PackageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2,replace = ANY)
public class ITResources {

    @Autowired
    PackageRepository packageRepository;

    @Autowired
    ApplicationRepository applicationRepository;

//    @LocalServerPort
//    int randomServerPort;

    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        Package pack2 = Package.builder()
            .title("Göteborg culture")
            .city("Göteborg")
            .curator("Alissa McCarthy")
            .curatorPicture("https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
            .description("Om du vill få ut det bästa av Göteborgs kulturutbud, så är dessa appar något för dig!")
            .tag("TRAVEL EAT PARTY")
            .build();

        Application radioApp = Application.builder()
            .android_link("https://play.google.com/store/apps/details?id=appinventor.ai_viktor_ohlsson.Radiomuseet")
            .ios_link("empty-for-now")
            .logo("https://lh3.googleusercontent.com/jiVkiuhFHRTNKMi-KfWPvyAq_Re7vSpqwoYJ_PbLQZjIWcdb4_KxuNwJX9HcUX_EXEY=s128-rw")
            .title("App2")
            .build();

        Application savedRadioApp = applicationRepository.save(radioApp);
        pack2.addApplication(savedRadioApp);
        packageRepository.save(pack2);
    }

}
