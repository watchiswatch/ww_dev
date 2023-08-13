package com.example.a104.project.service;

import com.example.a104.project.entity.CountEntity;
import com.example.a104.project.repository.CountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CountService {

    private final CountRepository countRepository;

    public List<CountEntity> CountList(LocalDate date, String name){
        return countRepository.findBySearchAndName(date, name);
    }

    public void Count(LocalDate date, String name){
        countRepository.Count(date,name);
    }

    public void save(CountEntity countEntity){
        countRepository.save(countEntity);
    }
}
