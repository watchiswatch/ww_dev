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
@Table(name="reader_state")
public class ReaderStateEntity {

    @Id
    @Column
    private String reader;

    @Column
    private Integer state;

    @Column(name = "user_id")
    private Integer userId;
}
