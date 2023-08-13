package com.example.a104.project.entity;


import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Entity
@Builder
@DynamicInsert
@IdClass(CountEntityId.class)
@Table(name="count")
public class CountEntity {

    @Id
    private LocalDate search;

    @Id
    private String name;

    @Column
    private int count;

    @Column(name = "gym_code2")
    private int gymCode;
}
