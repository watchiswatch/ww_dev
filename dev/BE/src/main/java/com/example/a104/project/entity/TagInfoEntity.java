package com.example.a104.project.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Entity
@Builder
@DynamicInsert
@Table(name = "tag_info")
public class TagInfoEntity {

    @Id
    @Column(name = "tag_info_pk")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer primaryKey;

    @Column(name = "tag_date")
    private LocalDate tagDate;

    @Column(name = "user_id")
    private Integer userId;

    @Column
    private String reader;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;
}
