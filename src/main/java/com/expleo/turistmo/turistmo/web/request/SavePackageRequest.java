package com.expleo.turistmo.turistmo.web.request;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class SavePackageRequest {

    @NotBlank(message = "Please enter title.")
    private String title;
    @NotBlank(message = "Please select city.")
    private String city;
    @NotBlank(message = "Please enter description.")
    private String description;
    @NotEmpty(message = "Please add applications.")
    private Set<Application> usefulApplications;
    @NotEmpty(message = "Please add tags.")
    private Set<Tag> tags;
}
