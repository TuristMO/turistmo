package com.expleo.turistmo.turistmo.web.response;


import com.expleo.turistmo.turistmo.domain.Curator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PackageResponse {
    private String message;
    private Curator curator;
    //Istället
}
