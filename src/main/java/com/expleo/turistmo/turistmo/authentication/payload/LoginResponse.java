package com.expleo.turistmo.turistmo.authentication.payload;

import com.expleo.turistmo.turistmo.domain.Curator;
import java.io.Serializable;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class LoginResponse implements Serializable {

    private final String authorization;  //Bearer salkalkflkaflka
    private final Curator body;
    private final Integer status;

}
