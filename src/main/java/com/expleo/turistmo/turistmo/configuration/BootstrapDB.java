package com.expleo.turistmo.turistmo.configuration;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Curator;
import com.expleo.turistmo.turistmo.domain.Package;
import com.expleo.turistmo.turistmo.domain.Tag;
import com.expleo.turistmo.turistmo.repository.ApplicationRepository;
import com.expleo.turistmo.turistmo.repository.CuratorRepository;
import com.expleo.turistmo.turistmo.repository.PackageRepository;
import com.expleo.turistmo.turistmo.repository.TagRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;


@RequiredArgsConstructor
@Configuration
public class BootstrapDB implements CommandLineRunner {


    private final PackageRepository packageRepository;
    private final ApplicationRepository applicationRepository;
    private final CuratorRepository curatorRepository;
    private final TagRepository tagRepository;

    @Override
    public void run(String... args) {

        if (packageRepository.count() <= 0 && applicationRepository.count() <= 0) {

            Curator johndoe = Curator.builder()
                    .avatarUrl("CURATOR_URL")
                    .email("johdoe@gmail.com")
                    .firstName("John")
                    .lastName("Doe")
                    .password("123321")
                    .description("I am an software developer.")
                    .build();

            Curator joanadoe = Curator.builder()
                    .avatarUrl("CURATOR_URL")
                    .email("joanadoe@gmail.com")
                    .firstName("Joana")
                    .lastName("Doe")
                    .password("123321")
                    .description("I am an test and quality person.")
                    .build();

            Curator alissa= Curator.builder()
                    .avatarUrl("CURATOR_URL")
                    .email("alissamcarthygmail.com")
                    .firstName("Alissa")
                    .lastName("McCarthy")
                    .password("123321")
                    .description("Alissa is an influencer.")
                    .build();

            Curator arthur= Curator.builder()
                    .avatarUrl("CURATOR_URL")
                    .email("arthurmcarthygmail.com")
                    .firstName("Arthur")
                    .lastName("McCarthy")
                    .password("123321")
                    .description("Arthur is an amazing historian.")
                    .build();
            Curator mahoney= Curator.builder()
                    .avatarUrl("CURATOR_URL")
                    .email("mahonygmail.com")
                    .firstName("Ma")
                    .lastName("Honey")
                    .password("123321")
                    .description("Ma will never be tired of sharing.")
                    .build();

            Curator savedJohnDoe = curatorRepository.save(johndoe);
            Curator savedAlissa = curatorRepository.save(alissa);
            Curator savedJoana = curatorRepository.save(joanadoe);
            Curator savedArthur = curatorRepository.save(arthur);
            Curator savedMahoney = curatorRepository.save(mahoney);


            Tag foodTag = Tag.builder()
                    .title("Food").build();
            Tag culture = Tag.builder()
                    .title("Culture").build();
            Tag travel = Tag.builder()
                    .title("Travel").build();
            Tag business = Tag.builder()
                    .title("Business").build();

            Tag savedCultureTag = tagRepository.save(culture);
            Tag savedFoodTag = tagRepository.save(foodTag);
            Tag savedTravelTag = tagRepository.save(travel);
            Tag savedBusinessTag = tagRepository.save(business);

            Package pack = Package.builder()
                    .title("Traveling around Stockholm")
                    .city("Stockholm")
                    .curator(savedAlissa)
                    .description("I det här paketet hittar du nödvändiga appar för att åka runt i Stockholm")
                    .build();

            Application sl = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=com.sl.SLBiljetter&hl=sv")
                    .ios_link("empty-for-now")
                    .logo("https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/30/00/03/3000030b-6b4c-8e24-1ba9-1a541ae31b1c/AppIcon-NewUI-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/350x350.png")
                    .title("SL")
                    .build();
            Application app1Mock = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=com.nobina.resistockholm.resistockholm")
                    .ios_link("empty-for-now")
                    .title("Res i Stockholm")
                    .logo("https://lh3.googleusercontent.com/8bEW-rvEPMrJqTAOPYlaI0GdZQSYXFe9DrU_S_N2mdJzeX6TG02elgZ4MF_Gh7CGFvQ=s180-rw")
                    .build();

            Application savedSL = applicationRepository.save(sl);
            Application savedApp = applicationRepository.save(app1Mock);

            pack.addTag(savedTravelTag);
            pack.addTag(savedFoodTag);

            pack.addApplication(savedSL);
            pack.addApplication(savedApp);

            Package pack2 = Package.builder()
                    .title("Göteborg culture")
                    .city("Göteborg")
                    .curator(savedJohnDoe)
                    .description("Om du vill få ut det bästa av Göteborgs kulturutbud, så är dessa appar något för dig!")
                    .build();

            Application radioApp = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=appinventor.ai_viktor_ohlsson.Radiomuseet")
                    .title("App1")
                    .ios_link("empty-for-now")
                    .logo("https://lh3.googleusercontent.com/jiVkiuhFHRTNKMi-KfWPvyAq_Re7vSpqwoYJ_PbLQZjIWcdb4_KxuNwJX9HcUX_EXEY=s128-rw")
                    .build();

            Application app2 = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=se.mobilestorytelling.higab&hl=en")
                    .ios_link("empty-for-now")
                    .logo("https://lh3.googleusercontent.com/WoBeYKgQ1CzlGPhNCM593u-ADxVk83y_3RNEOFhzIgGlzEBp8SPvrJ3yvuWdzrLC3dk=s180-rw")
                    .title("App2")
                    .build();
            Application savedRadioApp = applicationRepository.save(radioApp);
            Application savedApp2 = applicationRepository.save(app2);

            pack2.addApplication(savedRadioApp);
            pack2.addApplication(savedApp2);

            pack2.addTag(savedCultureTag);

            Package pack3 = Package.builder()
                    .title("Stockholm Food")
                    .city("Stockholm")
                    .curator(savedMahoney)
                    .guid(UUID.randomUUID())
                    .description("Om du vill få ut det bästa av Stockholms matutbud, så är dessa appar något för dig!")
                    .build();

            Application foodApp = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=appinventor.ai_viktor_ohlsson.Radiomuseet")
                    .title("food app1")
                    .ios_link("empty-for-now")
                    .guid(UUID.randomUUID())
                    .logo("https://lh3.googleusercontent.com/jiVkiuhFHRTNKMi-KfWPvyAq_Re7vSpqwoYJ_PbLQZjIWcdb4_KxuNwJX9HcUX_EXEY=s128-rw")
                    .build();

            Application foodApp2 = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=se.mobilestorytelling.higab&hl=en")
                    .ios_link("empty-for-now")
                    .logo("https://lh3.googleusercontent.com/WoBeYKgQ1CzlGPhNCM593u-ADxVk83y_3RNEOFhzIgGlzEBp8SPvrJ3yvuWdzrLC3dk=s180-rw")
                    .title("food app2")
                    .guid(UUID.randomUUID())
                    .build();
            Application savedFoodApp = applicationRepository.save(foodApp);
            Application savedFoodApp2 = applicationRepository.save(foodApp2);

            pack3.addApplication(savedFoodApp);
            pack3.addApplication(savedFoodApp2);
            pack3.addApplication(savedSL);

            pack3.addTag(savedFoodTag);
            pack3.addTag(savedTravelTag);

            Package pack4 = Package.builder()
                    .title("Mixing business with culture")
                    .city("Stockholm")
                    .curator(savedJoana)
                    .guid(UUID.randomUUID())
                    .description("Om du vill hinna med kulturlivet i Stockholm mellan mötena så kan dessa appar göra stor nytta för dig!")
                    .build();

            Application slackApp = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=com.Slack&hl=en_US&gl=US")
                    .title("Slack")
                    .ios_link("empty-for-now")
                    .guid(UUID.randomUUID())
                    .logo("https://lh3.googleusercontent.com/lV1DhBeSuikQy6fLPhgfNHUxDqterNlur4oB1Z_Yr0NOSiWwQOD0g8gWCjVf1mmMuw=s360-rw")
                    .build();

            Application voiApp = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=io.voiapp.voi&hl=en_US&gl=US")
                    .ios_link("empty-for-now")
                    .logo("https://lh3.googleusercontent.com/vNEZHiDSFc79gm73pPcvGtnE48w_sfbUpVroTRIsAfSVUV6z-MivDBMkMykYaVERIXwR=s360-rw")
                    .title("Voi")
                    .guid(UUID.randomUUID())
                    .build();

            Application modernaApp = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=com.avantime.moderna.agueli.klee&hl=en_US&gl=US")
                    .ios_link("empty-for-now")
                    .logo("https://lh3.googleusercontent.com/v9_nSC5LlvWLvgTGmcpORKQIL9vb-4Xa907wRNJ3-HSrrvdgLEnH_tTlisTc3_va1Q=s360-rw")
                    .title("Moderna muséet")
                    .guid(UUID.randomUUID())
                    .build();

            Application mapApp = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=de.topobyte.apps.offline.stadtplan.stockholm&hl=en_US&gl=US")
                    .ios_link("empty-for-now")
                    .logo("https://lh3.googleusercontent.com/1rkrLJEiyDFLIa6-bGYYAFqu4fKA8BDWWw8C7-RY8DXR_Szd9xamELSLLwbuOUuq97g=s360-rw")
                    .title("Offline karta")
                    .guid(UUID.randomUUID())
                    .build();

            Application busiApp = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=com.app_stockholmbusiness.layout&hl=en_US&gl=US")
                    .ios_link("empty-for-now")
                    .logo("https://lh3.googleusercontent.com/vNEZHiDSFc79gm73pPcvGtnE48w_sfbUpVroTRIsAfSVUV6z-MivDBMkMykYaVERIXwR=s360-rw")
                    .title("Business Directory")
                    .guid(UUID.randomUUID())
                    .build();

            Application aimoApp = Application.builder()
                    .android_link("https://play.google.com/store/apps/details?id=com.vulog.carshare.aimo&hl=en_US&gl=US")
                    .ios_link("empty-for-now")
                    .logo("https://lh3.googleusercontent.com/JWCzqxbHk62TtBZMgZ5fiKryM7LzI0V6PpNjVzjH6zh-CZFHm4deoqU1Qr1EIhC0Gur5=s360-rw")
                    .title("Aimo")
                    .guid(UUID.randomUUID())
                    .build();

            Application savedBusinessApp = applicationRepository.save(slackApp);
            Application savedBusinessApp2 = applicationRepository.save(voiApp);
            Application savedBusinessApp3 = applicationRepository.save(busiApp);
            Application savedBusinessApp4 = applicationRepository.save(aimoApp);
            Application savedBusinessApp5 = applicationRepository.save(mapApp);
            Application savedBusinessApp6 = applicationRepository.save(modernaApp);


            pack4.addApplication(savedBusinessApp);
            pack4.addApplication(savedBusinessApp2);
            pack4.addApplication(savedBusinessApp3);
            pack4.addApplication(savedBusinessApp4);
            pack4.addApplication(savedBusinessApp5);
            pack4.addApplication(savedBusinessApp6);

            pack4.addTag(savedCultureTag);
            pack4.addTag(savedBusinessTag);

            Package pack5 = Package.builder()
                    .title("The Culture in history")
                    .city("Malmö")
                    .curator(savedArthur)
                    .guid(UUID.randomUUID())
                    .description("Malmö är fullt av historia, allt går så länge man letar")
                    .build();

            pack5.addApplication(savedBusinessApp);
            pack5.addApplication(savedBusinessApp2);
            pack5.addApplication(savedBusinessApp3);
            pack5.addApplication(savedBusinessApp4);
            pack5.addApplication(savedBusinessApp5);
            pack5.addApplication(savedBusinessApp6);

            pack5.addTag(savedCultureTag);

            packageRepository.save(pack);
            packageRepository.save(pack2);
            packageRepository.save(pack3);
            packageRepository.save(pack4);
            packageRepository.save(pack5);

        }
    }
}
