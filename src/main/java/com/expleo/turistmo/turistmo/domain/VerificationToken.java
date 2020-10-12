package com.expleo.turistmo.turistmo.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.IntSequenceGenerator;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Table(name = "verification")
@Data
@NoArgsConstructor
@Entity
@JsonIdentityInfo(generator = IntSequenceGenerator.class)
@EqualsAndHashCode(exclude = {"curator"}, callSuper = false)
@ToString(exclude = {"curator"})
public class VerificationToken extends BaseEntity {

    @Builder
    public VerificationToken(String token,Curator curator,Date expiry,TokenType type,
        Long id, UUID guid, Timestamp createdDate, Timestamp lastModifiedDate) {
        super(id, guid, createdDate, lastModifiedDate);
        this.token=token;
        this.curator=curator;
        this.expiry=expiry;
        this.type=type;
    }

    private String token ;

    @OneToOne(targetEntity = Curator.class)
    @JoinColumn(name = "curator_id",nullable = false)
    private Curator curator;

    @Column(name = "expiry_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expiry;

    @Enumerated(EnumType.STRING)
    @Column(name = "token_name")
    private TokenType type;

    @PrePersist
    private void setDate(){
        Calendar c =Calendar.getInstance();
        c.add(Calendar.HOUR,24);
        expiry=c.getTime();
    }
}
