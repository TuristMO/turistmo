package com.expleo.turistmo.turistmo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.sql.Timestamp;
import java.util.UUID;
import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

@Setter
@Getter
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity {

    public BaseEntity(Long id, UUID guid, Timestamp createdDate, Timestamp lastModifiedDate) {
        this.id = id;
        this.guid = guid;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long id;

    /*
   'guid' is useful to hide incremental 'id' from all external communications for
    security reasons.
   'id' would be faster to index and query while doing pagination, filtering etc.
    It is better not to send back an incremental ID and primary
    key to the client for any object.
    Thus, GUIDs (Global Unique Identifiers) can be used. However, performance can be slow,
    as indexing big random characters is going to be slow.
     TO OVERCOME THIS, WE USE BOTH IDS.
  */
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 36, columnDefinition = "varchar")
    private UUID guid = UUID.randomUUID();

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdDate;

    @UpdateTimestamp
    private Timestamp lastModifiedDate;
}
