package com.example.a104.project.repository;

import com.example.a104.project.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity,Integer> {

    @Modifying
    @Query("update UserEntity u set u.gymCode = :code where u.id= :id")
    int UpdateGymCode(int code, String id);

    @Modifying
    @Query("update UserEntity u set u.regist = :c where u.id = :id")
    int Approval(int c,String id);

    @Modifying
    @Query("update UserEntity u set u.regist = NULL, u.gymCode = NULL where u.id = :id")
    int Delete(String id);

    @Modifying
    @Transactional
    @Query("update UserEntity u set u.deviceCode = NULL where u.id = :id")
    void DeleteDevice(String id);

    @Modifying
    @Transactional
    @Query("update UserEntity u set u.deviceCode = :deviceCode where u.id = :id")
    void MatchDevice(String deviceCode,String id);


    UserEntity findByDeviceCode(String deviceCode);
    UserEntity findByUserId(int userId);
    List<UserEntity> findByNameContainingAndGymCode(String keyword, int gymCode);
    List<UserEntity> findById(String Id);
    List<UserEntity> findByGymCodeAndRegistIsNotNull(int gymCode);
    List<UserEntity> findByGymCodeAndDeviceCodeIsNotNull(int gymCode);
    List<UserEntity> findByGymCodeAndRegistIsNull(int gymCode);
}
