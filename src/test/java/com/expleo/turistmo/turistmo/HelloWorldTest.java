package com.expleo.turistmo.turistmo;

import static org.assertj.core.api.Assertions.assertThat;

import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.remote.MobileCapabilityType;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.remote.DesiredCapabilities;

class HelloWorldTest {

    HelloWorld helloWorld = new HelloWorld();

    @Test
    void helloWorld() {
        assertThat(helloWorld.helloWorld()).isNotNull();
    }
    
}
