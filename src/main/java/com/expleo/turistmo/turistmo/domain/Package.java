package com.expleo.turistmo.turistmo.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.IntSequenceGenerator;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
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
@ToString(exclude = {"usefulApplications", "curator", "tags"})
@EqualsAndHashCode(exclude = {"usefulApplications", "curator", "tags"}, callSuper = false)
public class Package extends BaseEntity {

    @Builder
    public Package(Long id, UUID guid, Timestamp createdDate, Timestamp lastModifiedDate
        , String title, Curator curator, String city, String description,
        Set<Application> usefulApplications, Set<Tag> tags) {
        super(id, guid, createdDate, lastModifiedDate);
        this.title = title;
        this.curator = curator;
        this.city = city;
        this.description = description;
        this.usefulApplications = new HashSet<>();
        this.tags = new HashSet<>();
    }

    @NotBlank(message = "Package must have a title")
    @Size(min = 2, max = 40, message = "Title should be between 2-40 characters.")
    private String title;
    @NotBlank(message = "Enter a valid city.")
    @Size(min = 2, max = 40, message = "City name should be between 2-40 characters.")
    private String city;

    @Column(columnDefinition = "TEXT",name = "package_description")
    @NotBlank(message = "You must enter a description about the package.")
    private String description;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    private Curator curator;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinTable(name = "package_application",
        joinColumns = @JoinColumn(name = "package_id", foreignKey = @ForeignKey(name = "fk_package_application")),
        inverseJoinColumns = @JoinColumn(name = "application_id", foreignKey = @ForeignKey(name = "fk_application_package")))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Application> usefulApplications = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinTable(name = "package_tag",
        joinColumns = @JoinColumn(name = "package_id", foreignKey = @ForeignKey(name = "fk_package_tag")),
        inverseJoinColumns = @JoinColumn(name = "tag_id", foreignKey = @ForeignKey(name = "fk_tag_package")))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Tag> tags = new HashSet<>();


    public void addApplication(Application application) {
        this.usefulApplications.add(application);
    }

    public void deleteApplication(Application application) {
        this.getUsefulApplications().remove(application);
        application.getPackages().remove(this);
    }

    public void addTag(Tag tag) {
        this.tags.add(tag);
    }

    public void deleteTag(Tag tag) {
        this.tags.remove(tag);
        tag.getPackages().remove(this);
    }
}

