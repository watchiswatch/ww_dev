package com.example.a104.project.service;

import com.example.a104.project.entity.DeviceEntity;
import com.example.a104.project.entity.UserEntity;
import com.example.a104.project.repository.DeviceRepository;
import com.example.a104.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;

    public DeviceEntity getDevice(String deviceCode){
        return deviceRepository.findByDeviceCode(deviceCode);
    }

    public List<DeviceEntity> DeviceList(int gymCode) {
        return deviceRepository.findByGymCodeAndUseIsNull(gymCode);
    }

    public List<UserEntity> UserDevice(int gymCode) {
        return userRepository.findByGymCodeAndDeviceCodeIsNotNull(gymCode);
    }

    public void DeleteDevice(String deviceCode) {
        deviceRepository.DeleteDevice(deviceCode);
    }

    public void MatchDevice(String deviceCode) {
        deviceRepository.MatchDevice(deviceCode);
    }

}
