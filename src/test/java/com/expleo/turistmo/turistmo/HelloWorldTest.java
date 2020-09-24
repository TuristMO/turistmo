package com.expleo.turistmo.turistmo;

import static org.assertj.core.api.Assertions.assertThat;

import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.remote.MobileCapabilityType;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

class HelloWorldTest {

    HelloWorld helloWorld = new HelloWorld();

    @Test
    void helloWorld() {
        assertThat(helloWorld.helloWorld()).isNotNull();
    }

   //  @Test
    void name() throws MalformedURLException, InterruptedException {
        DesiredCapabilities dc=new DesiredCapabilities();
        dc.setCapability(MobileCapabilityType.DEVICE_NAME,"emulator-5554");
        dc.setCapability("platformName","android");
        dc.setCapability("appPackage","host.exp.exponent");
        dc.setCapability("appActivity",".experience.HomeActivity");
        dc.setCapability("noReset",true);
        dc.setCapability("appWaitForLaunch",true);

       AndroidDriver<AndroidElement> driver =new AndroidDriver<AndroidElement>(new URL("http://127.0.0.1:4723/wd/hub"),dc);
        driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);

        MobileElement el1 =
                getElementByXPath(driver, "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[6]/android.view.ViewGroup[2]/android.widget.TextView[1]");
        el1.click();

        Thread.sleep(20000);

        MobileElement el2 = null;
        try {
            el2 = getElementByXPath(driver, "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[2]/android.view.ViewGroup");
            if(el2.isDisplayed()){
                el2.click();
            }

        } catch (Exception e) {
            System.out.println("Pop-up didnt displayed");
        }



       MobileElement searchField = (MobileElement) driver.findElementByAccessibilityId("searchField");
         searchField.click();
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        searchField.sendKeys("stockholm");
        MobileElement searchButton = (MobileElement) driver.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup[2]/android.widget.Button");
        searchButton.click();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        MobileElement curatorName = (MobileElement) driver.findElementByAccessibilityId("curatorName");

      assertThat(  curatorName.getText()).isEqualTo("John Doe");



    }

    private MobileElement getElementByXPath(AndroidDriver<AndroidElement> driver, String s) {
        return (MobileElement) driver.findElementByXPath(s);
    }
}
