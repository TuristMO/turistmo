package com.expleo.turistmo.turistmo.services;

import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;

//@EnableAsync
//@Slf4j
//public class TokenVerificationScheduling {
//
//    @Async
////    @Scheduled(cron = "0 15 10 15 * ?", zone = "Europe/Paris")
//    @Scheduled(cron = "${app.cron.expression}")
//    public void scheduleFixedRateTaskAsync() {
//        //TODO find verification token by time
//        // Delete all the expired verification token if any;
//        String expiredToken= UUID.randomUUID().toString();
//        log.info(String.format("Expired token %s is deleted.",expiredToken));
//    }
//
//}
