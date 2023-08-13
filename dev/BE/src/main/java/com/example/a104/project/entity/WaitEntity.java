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
@IdClass(WaitEntityId.class)
@Table(name="wait")
public class WaitEntity {

    @Id
    @Column(name = "wait_time")
    private LocalDateTime waitTime;

    @Id
    @Column
    private String reader;

    @Column
    private Integer count;

    @Column
    private String name;
}
