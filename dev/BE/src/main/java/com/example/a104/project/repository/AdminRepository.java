package com.example.a104.project.repository;

import com.example.a104.project.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
    List<AdminEntity> findById(String id);
    AdminEntity findByGymCode (int gymCode);

}
