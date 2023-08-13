package com.example.a104.project.entity;


import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Entity
@Builder
@DynamicInsert
@Table(name="user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="user_id")
    private int userId;

    @Column
    private String id;

    @Column
    private String password;

    @Column
    private String email;

    @Column(name="phone_number")
    private String phoneNumber;

    @Column
    private String sex;

    @Column(name="gym_code")
    @Builder.Default
    private Integer gymCode = null;
//    private int gymCode;

    @Builder.Default
    @Column
    private Integer regist = null;
//    private int regist;

    @Column(name="device_code")
    private String deviceCode;

    @Column
    private String name;



}
