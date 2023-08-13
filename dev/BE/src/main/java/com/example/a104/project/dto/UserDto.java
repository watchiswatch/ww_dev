package com.example.a104.project.dto;

import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDate;

@Data
public class UserDto {


    @Column(name="user_id")
    private int userId;

    @Column
    private String id;

    @Column
    private String name;

    @Column
    private LocalDate date;
}
