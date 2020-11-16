package com.expleo.turistmo.turistmo.web.request;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class SavePackageRequest {

    @NotBlank(message = "Enter title.")
    private String title;
    @NotBlank(message = "Select city.")
    private String city;
    @NotBlank(message = "Enter description.")
    private String description;
    @NotEmpty(message = "Please add applications.")
    private Set<Application> usefulApplications;
    @NotEmpty(message = "Please add tags.")
    private Set<Tag> tags;
}
