package com.example.a104.project.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor(access = AccessLevel.PROTECTED)

@Data
@Entity
@Table(name="admin")
public class AdminEntity {

    @Id
    @Column(name="gym_code")
    private int gymCode;

    @Column
    private String name;

    @Column
    private String id;

    @Column
    private String password;

    @Builder
    public AdminEntity(int gymCode, String name, String id, String password) {
        this.gymCode = gymCode;
        this.name = name;
        this.id = id;
        this.password = password;
    }
}
