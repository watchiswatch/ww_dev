package com.example.a104.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenResponseNoData<T> {
    private String code;
    private String msg;
}
