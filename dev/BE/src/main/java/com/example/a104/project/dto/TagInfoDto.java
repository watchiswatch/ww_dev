package com.example.a104.project.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class TagInfoDto {

    private String reader;
    private String name;
    private int userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDate tagData;
}