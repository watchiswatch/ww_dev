package com.example.a104.project.controller;

import com.example.a104.project.entity.DeviceEntity;
import com.example.a104.project.entity.UserEntity;
import com.example.a104.project.service.AdminService;
import com.example.a104.project.service.DeviceService;
import com.example.a104.project.service.UserService;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name="디바이스(팔찌)관련 API", description = "디바이스(팔찌) 관련해서 사용되는 API 입니다.")
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/devices")
@RestController
public class DeviceController {
    private final AdminService adminService;
    private final DeviceService deviceService;
    private final UserService userService;


    @Operation(summary = "디바이스(팔찌) 목록",description = "헬스장이 보유한 디바이스(팔찌)의 목록을 반환해준다.")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping
    public List<DeviceEntity> DeviceList(@RequestHeader(value = "Authorization") String token) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        List<DeviceEntity> list = deviceService.DeviceList(gymCode);
        return list;
    }

    @Operation(summary = "디바이스를 제공받은 회원 목록",description = "현재 헬스장에 디바이스를 제공받은 회원들의 목록을 반환해준다.")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping("offer-present")
    public List<UserEntity> UserDevice(@RequestHeader(value = "Authorization") String token) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        return deviceService.UserDevice(gymCode);

    }

    // 디바이스 삭제
    @Operation(summary = "디바이스(팔찌) 삭제",description = "회원에게 매칭되었던 디바이스를 매칭취소합니다.")
    @PutMapping
    public void DeleteDeviceCode(@RequestBody Map<String, String> map) {
        String deviceCode = map.get("device_code");
        String id = map.get("id");
        deviceService.DeleteDevice(deviceCode);
        userService.DeleteDevice(id);

    }

    // 디바이스 매칭
    @Operation(summary = "디바이스(팔찌) 매칭",description = "회원에게 디바이스를 매칭(제공)합니다.")
    @PutMapping("match")
    public void MatchDevice(@RequestBody Map<String, String> map) {
        String deviceCode = map.get("device_code");
        String id = map.get("id");
        deviceService.MatchDevice(deviceCode);
        userService.MatchDevice(deviceCode, id);
    }

}
