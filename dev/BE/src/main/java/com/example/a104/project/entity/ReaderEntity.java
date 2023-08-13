package com.example.a104.project.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Entity
@Builder
@DynamicInsert
@Table(name = "reader")
public class ReaderEntity {
    @Id
    @Column
    private String reader;

    @Column
    @Builder.Default
    private String region = null;

    @Column
    @Builder.Default
    private String name = null;

    @Column(name = "gym_code")
    private Integer gymCode;

}
