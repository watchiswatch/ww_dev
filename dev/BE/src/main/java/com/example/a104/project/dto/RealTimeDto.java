package com.example.a104.project.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class RealTimeDto {
    private String region;
    private String reader;
    private String name;
    private Integer gymCode;
    private Integer userId;
    private List<Integer> waitingList;
    private Integer waitingCount;
    private LocalDateTime startTime;
}
