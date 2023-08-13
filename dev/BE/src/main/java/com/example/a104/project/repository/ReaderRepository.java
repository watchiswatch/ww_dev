package com.example.a104.project.repository;

import com.example.a104.project.entity.ReaderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReaderRepository extends JpaRepository<ReaderEntity,String> {
    List<ReaderEntity> findByGymCode(int gymCode);
    List<ReaderEntity> findByGymCodeAndNameIsNotNull(int gymCode);
    ReaderEntity findByReader(String reader);
    List<ReaderEntity> findByGymCodeAndRegion(int gymCode, String region);
}
