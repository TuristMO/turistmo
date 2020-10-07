package com.expleo.turistmo.turistmo.IT;


import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpStatus.OK;

import com.expleo.turistmo.turistmo.config.RestResponsePage;
import com.expleo.turistmo.turistmo.domain.Package;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;


public class PackageIT extends ITResources {

    private final String url = "/api/v1/package";

    @Test
    @DisplayName("It should get a page response with packages")
    void itShouldGetResponseWithPackages() throws URISyntaxException {
        URI uri = new URI(url.concat("?page=0&size=10"));

        ParameterizedTypeReference<RestResponsePage<Package>> responseType = new ParameterizedTypeReference<>() {};
        ResponseEntity<RestResponsePage<Package>> packageResponse = restTemplate.exchange(uri, GET, null, responseType);

        List<Package> packageList = packageResponse.getBody().getContent();
        //Notes that the h2 database get also populated with data from BootstrapDB class.
        //That is why we get result 3.
        assertThat(packageList).hasSize(3); //Change when Bootstrap DB gets removed to whatever mocked size.
        assertThat(packageResponse.getStatusCode()).isEqualTo(OK);
    }

}
