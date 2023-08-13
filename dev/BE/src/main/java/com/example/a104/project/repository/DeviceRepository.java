package com.example.a104.project.repository;

import com.example.a104.project.entity.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface DeviceRepository extends JpaRepository<DeviceEntity,String> {

    List<DeviceEntity> findByGymCodeAndUseIsNull(int gymCode);
    DeviceEntity findByDeviceCode(String deviceCode);

    // 디바이스 매칭
    @Modifying
    @Transactional
    @Query("update DeviceEntity d set d.use = 1 where d.deviceCode= :deviceCode")
    void MatchDevice(String deviceCode);


    // 매칭된 디바이스 삭제
    @Modifying
    @Transactional
    @Query("update DeviceEntity d set d.use = null where d.deviceCode= :deviceCode")
    void DeleteDevice(String deviceCode);
}
