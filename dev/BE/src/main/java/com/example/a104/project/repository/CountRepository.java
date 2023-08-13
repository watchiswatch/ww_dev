package com.example.a104.project.repository;

import com.example.a104.project.entity.CountEntity;
import com.example.a104.project.entity.CountEntityId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

public interface CountRepository extends JpaRepository<CountEntity, CountEntityId> {
    @Modifying
    @Transactional
    @Query("update CountEntity c set c.count = c.count+1 where c.search = :date and c.name = :name")
    void Count(LocalDate date, String name);

    List<CountEntity> findBySearchAndName(LocalDate date, String name);


}
