package com.example.a104.project.service;

import com.example.a104.project.entity.ReservationEntity;
import com.example.a104.project.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public List<ReservationEntity> getReservationList(String reader){
        return reservationRepository.findByReaderOrderByReservationAsc(reader);
    }
}
