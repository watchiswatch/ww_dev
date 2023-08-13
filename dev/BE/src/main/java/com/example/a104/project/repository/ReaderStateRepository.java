package com.example.a104.project.repository;

import com.example.a104.project.entity.ReaderStateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface ReaderStateRepository extends JpaRepository<ReaderStateEntity,String> {
    // 리더기 상태
    ReaderStateEntity findByReader(String reader);

    // 내가 지금 운동기구 사용중인지 체크
    ReaderStateEntity findByUserId(int userId);

    //대기없는 상태로 변경(미사용)
    @Modifying
    @Transactional
    @Query("update ReaderStateEntity r set r.state = 1, r.userId=null where r.reader = :reader")
    void nExistReservation(String reader);

    //대기있는 상태로 변경(미사용)
    @Modifying
    @Transactional
    @Query("update ReaderStateEntity r set r.state = 2, r.userId=null where r.reader = :reader")
    void ExistReservation(String reader);

    //사용중 상태로 변경
    @Modifying
    @Transactional
    @Query("update ReaderStateEntity r set r.state = 0, r.userId=:userId where r.reader= :reader")
    void updateState(String reader, int userId);
}
