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
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@NoArgsConstructor
@Data
@Entity
@ToString(exclude = {"packages"})
@EqualsAndHashCode(exclude = {"packages"}, callSuper = false)
@JsonIdentityInfo(generator = IntSequenceGenerator.class)
public class Application extends BaseEntity {

    @Builder
    public Application(Long id, UUID guid, Timestamp createdDate, Timestamp lastModifiedDate,
        String ios_link, String android_link, String logo, Set<Package> packages,String title) {
        super(id, guid, createdDate, lastModifiedDate);
        this.ios_link = ios_link;
        this.android_link = android_link;
        this.logo = logo;
        this.packages =  new HashSet<>();
        this.title=title;
    }

    @NotBlank(message = "Application must have a title.")
    private String title;

    @NotBlank(message = "Application must have a logo")
    private String logo;

    //Make sure to control this on the client side.
    private String ios_link="EMPTY";
    private String android_link="EMPTY";


    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinTable(name = "package_application",
        joinColumns = @JoinColumn(name = "application_id", foreignKey = @ForeignKey(name = "fk_application_package")),
        inverseJoinColumns = @JoinColumn(name = "package_id", foreignKey = @ForeignKey(name = "fk_package_application")))
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonIgnore
    private Set<Package> packages = new HashSet<>();
}
