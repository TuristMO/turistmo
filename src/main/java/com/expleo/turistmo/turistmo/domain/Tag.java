package com.expleo.turistmo.turistmo.domain;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
//@JsonIdentityInfo(generator = IntSequenceGenerator.class)
@ToString(exclude = {"packages"})
@EqualsAndHashCode(exclude = {"packages"}, callSuper = false)
public class Tag extends BaseEntity{

    @Builder
    public Tag(Long id, UUID guid, Timestamp createdDate, Timestamp lastModifiedDate,String title,Set<Package> packages) {
        super(id, guid, createdDate, lastModifiedDate);
        this.title=title;
        this.packages=new HashSet<>();
    }

    @NotBlank(message = "Tag cannot be empty.")
    String title;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinTable(name = "package_tag",
        joinColumns = @JoinColumn(name = "tag_id", foreignKey = @ForeignKey(name = "fk_tag_package")),
        inverseJoinColumns = @JoinColumn(name = "package_id", foreignKey = @ForeignKey(name = "fk_package_tag")))
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonIgnore
    private Set<Package> packages = new HashSet<>();

}
