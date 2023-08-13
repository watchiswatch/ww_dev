package com.example.a104.project.service;

import com.example.a104.project.entity.ReaderEntity;
import com.example.a104.project.repository.ReaderRepository;
import com.example.a104.project.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReaderService {
    private final ReaderRepository readerRepository;
    private final ReservationRepository reservationRepository;
    public List<ReaderEntity> getReaderList(int gymCode){
        return readerRepository.findByGymCode(gymCode);
    }
    public List<ReaderEntity> getMatchReaders(int gymCode){
        return readerRepository.findByGymCodeAndNameIsNotNull(gymCode);
    }


    public ReaderEntity getReader(String reader){
        return readerRepository.findByReader(reader);
    }
    public void updateReader(List<ReaderEntity> readers){
        for(ReaderEntity reader: readers){
            readerRepository.save(reader);
        }
    }

    public void deleteReservation(int userId){
        reservationRepository.deleteByUserId(userId);
    };
}
