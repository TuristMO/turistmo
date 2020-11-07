package com.expleo.turistmo.turistmo.web.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SignUpRequest {

    @NotBlank(message = "Email should not be empty.")
    private String email;
    @Size(min = 5, max = 20,message = "Password should be between 6-20 characters.")
    private String password;
    @Size(min = 5, max = 20,message = "Password should be between 6-20 characters.")
    private String confirmPassword;
    @NotBlank(message = "Please add your first name.")
    private String firstName;
    @NotBlank(message = "Please add your last name.")
    private String lastName;
}
