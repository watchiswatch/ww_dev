package com.example.a104.project.entity;

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDate;

public class CountEntityId implements Serializable {

    @Column
    private LocalDate search;

    @Column
    private String name;
}
