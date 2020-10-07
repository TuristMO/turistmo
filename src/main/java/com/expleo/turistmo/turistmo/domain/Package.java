package com.expleo.turistmo.turistmo.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.IntSequenceGenerator;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
@JsonIdentityInfo(generator = IntSequenceGenerator.class)
@ToString(exclude = {"usefulApplications"})
@EqualsAndHashCode(exclude = {"usefulApplications"}, callSuper = false)
public class Package extends BaseEntity {

    @Builder
    public Package(Long id, UUID guid, Timestamp createdDate, Timestamp lastModifiedDate
        , String title, String curator, String curatorPicture, String tag, String city, String description,
        Set<Application> usefulApplications) {
        super(id, guid, createdDate, lastModifiedDate);
        this.title = title;
        this.curator = curator;
        this.curatorPicture = curatorPicture;
        this.tag = tag;
        this.city = city;
        this.description = description;
        this.usefulApplications = new HashSet<>();
    }

    private String title;
    private String curator;
    private String curatorPicture;
    private String tag;
    private String city;
    private String description;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinTable(name = "package_application",
        joinColumns = @JoinColumn(name = "package_id", foreignKey = @ForeignKey(name = "fk_package_application")),
        inverseJoinColumns = @JoinColumn(name = "application_id", foreignKey = @ForeignKey(name = "fk_application_package")))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<com.expleo.turistmo.turistmo.domain.Application> usefulApplications = new HashSet<>();

    public void addApplication(com.expleo.turistmo.turistmo.domain.Application application) {
        this.usefulApplications.add(application);
    }

    public void deleteApplication(Application application) {
        this.getUsefulApplications().remove(application);
        application.getPackages().remove(this);
    }
}

