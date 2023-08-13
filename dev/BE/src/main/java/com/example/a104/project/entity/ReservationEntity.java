package com.example.a104.project.entity;


import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Entity
@Builder
@DynamicInsert
@IdClass(ReservationEntityId.class)
@Table(name="reservation")
public class ReservationEntity {

    @Id
    @Column
    private String reader;

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Column
    private LocalDateTime reservation;

}
