package com.example.a104.project.entity;

import javax.persistence.Column;
import java.io.Serializable;

public class ReservationEntityId implements Serializable {

    @Column
    private String reader;

    @Column(name = "user_id")
    private Integer userId;
}
