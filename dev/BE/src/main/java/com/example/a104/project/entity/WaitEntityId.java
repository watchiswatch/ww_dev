package com.example.a104.project.entity;

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDateTime;

public class WaitEntityId implements Serializable {


    @Column(name = "wait_time")
    private LocalDateTime waitTime;

    @Column
    private String reader;
}
