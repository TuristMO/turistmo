package com.expleo.turistmo.turistmo.domain;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.IntSequenceGenerator;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@Entity
//@JsonIdentityInfo(generator = IntSequenceGenerator.class)
@EqualsAndHashCode(exclude = {"packages"}, callSuper = true)
@ToString(exclude = {"packages"})
public class Curator extends BaseEntity {

    @Builder
    public Curator(Long id, UUID guid, Timestamp createdDate, Timestamp lastModifiedDate, String firstName, String lastName, String email,
                   String password, String avatarUrl, String description, Set<Package> packages) {
        super(id, guid, createdDate, lastModifiedDate);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.avatarUrl = avatarUrl;
        this.description = description;
        this.packages = new HashSet<>();
    }

    @NotBlank(message = "First name should not be empty.")
    @Size(min = 2, max = 20,message = "First name should be between 2-20 characters.")
    private String firstName;
    @NotBlank(message = "Last name should not be empty.")
    @Size(min = 2, max = 30,message = "Last name should be between 2-30 characters.")
    private String lastName;

    @NotBlank(message = "Email should not be empty.")
    private String email;
    //TODO make these match the message, as of now the password is not restricted
    @Size( min = 5, max = 100, message = "Password should be between 6-20 characters.")
    @JsonIgnore
    private String password;

    private String avatarUrl = "EMPTY";

    @Column(columnDefinition = "TEXT", name = "curator_description")
    private String description;
    @Enumerated(EnumType.STRING)
    @Column(name = "curator_role")
    private Role role = Role.CURATOR;
    private Boolean verified = false;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL,
            orphanRemoval = true, mappedBy = "curator")
    Set<Package> packages = new HashSet<>();

    public void addPackages(Package newPackage){
        this.packages.add(newPackage);
    }
}
