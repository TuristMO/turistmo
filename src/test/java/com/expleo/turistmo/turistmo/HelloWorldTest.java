package com.expleo.turistmo.turistmo;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

class HelloWorldTest {

    HelloWorld helloWorld = new HelloWorld();

    @Test
    void helloWorld() {
        assertThat(helloWorld.helloWorld()).isNotNull();
    }

}
