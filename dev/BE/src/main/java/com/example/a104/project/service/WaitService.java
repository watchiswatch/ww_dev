package com.example.a104.project.service;

import com.example.a104.project.repository.WaitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WaitService {
    private final WaitRepository waitRepository;

    public Integer getWeek(String date, String reader){
        return waitRepository.getWeek(date, reader);
    }
}
