package com.example.a104.project.repository;

import com.example.a104.project.entity.UserDateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface UserDateRepository extends JpaRepository<UserDateEntity, Integer> {
    @Query("select u.approval_user from UserDateEntity u where u.userId=:userId")
    LocalDate getUserDate(int userId);

    @Modifying
    @Query("update UserDateEntity u set u.dropout = :dateTime where u.userId = :userId")
    void dropout(LocalDateTime dateTime, int userId);

    @Modifying
    @Query("update UserDateEntity u set u.approval_user = :date where u.userId = :userId")
    void access_user(LocalDate date,int userId);

    @Modifying
    @Query("update UserDateEntity u set u.access_admin = :date where u.userId = :userId")
    void access_admin(LocalDate date, int userId);
}
