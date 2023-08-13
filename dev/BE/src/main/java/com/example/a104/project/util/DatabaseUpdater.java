package com.example.a104.project.util;


import com.example.a104.project.entity.ReservationEntity;
import com.example.a104.project.entity.WaitEntity;
import com.example.a104.project.repository.ReaderRepository;
import com.example.a104.project.repository.ReservationRepository;
import com.example.a104.project.repository.WaitRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DatabaseUpdater {

    private final ReservationRepository reservationRepository;
    private final WaitRepository waitRepository;
    private final ReaderRepository readerRepository;

    public DatabaseUpdater(ReservationRepository reservationRepository, WaitRepository waitRepository, ReaderRepository readerRepository) {
        this.reservationRepository = reservationRepository;
        this.waitRepository = waitRepository;
        this.readerRepository = readerRepository;
    }

    @Scheduled(cron = "0 0,10,20,30,40,50 * * * *")
    public void updateDatabase(){
        List<ReservationEntity> list = reservationRepository.findAll();
        Set<String> set = new HashSet<>();
        for(ReservationEntity reservationVo : list){
            set.add(reservationVo.getReader());
        }
        for(String reader : set){
            WaitEntity waitVo = WaitEntity.builder()
                    .reader(reader)
                    .waitTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                    .count(reservationRepository.findByReaderOrderByReservationAsc(reader).size())
                    .name(readerRepository.findByReader(reader).getName())
                    .build();
            waitRepository.save(waitVo);
        }
    }
}
