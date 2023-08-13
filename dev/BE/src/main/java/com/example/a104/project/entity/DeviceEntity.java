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
@Table(name="device")
public class DeviceEntity {

    @Id
    @Column(name = "device_code")
    private String deviceCode;

    @Column(name = "gym_code")
    private int gymCode;

    @Column(name="use_device")
    private Integer use;
}
