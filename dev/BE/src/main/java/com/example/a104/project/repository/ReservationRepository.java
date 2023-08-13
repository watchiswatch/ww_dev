package com.example.a104.project.repository;

import com.example.a104.project.entity.ReservationEntity;
import com.example.a104.project.entity.ReservationEntityId;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationEntity, ReservationEntityId> {


    List<ReservationEntity> findByReaderOrderByReservationAsc(String reader);
    ReservationEntity findByUserId(int userId);

    @Transactional
    void deleteByUserId(int userId);
}
