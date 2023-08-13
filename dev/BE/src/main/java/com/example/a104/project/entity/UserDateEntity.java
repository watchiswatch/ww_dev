package com.example.a104.project.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Entity
@Builder
@DynamicInsert
@Table(name="user_date")
public class UserDateEntity {

    @Id
    @Column(name="user_id")
    private int userId;

    @Column
    private LocalDateTime signin;

    @Column
    private LocalDateTime dropout;

    @Column
    //@Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate approval_user;

    @Column
    //@Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate access_admin;
}
