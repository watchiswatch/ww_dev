package com.example.a104.project.controller;

import com.example.a104.project.entity.ReaderEntity;
import com.example.a104.project.service.AdminService;
import com.example.a104.project.service.ReaderService;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="리더기 관련 API", description = "리더기 관련해서 사용되는 API 입니다.")
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/readers")
@RestController
public class ReaderController {
    private final ReaderService readerService;
    private final AdminService adminService;

    @Operation(summary = "리더기 목록",description = "헬스장에 등록된 모든 리더기 목록을 반환해준다.")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping
    public List<ReaderEntity> getReaderList(@RequestHeader(value = "Authorization") String token) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        return readerService.getReaderList(gymCode);
    }

    @Operation(summary = "리더기와 기구 매칭 수정",description = "매칭되었던 기구와 리더기를 분리, 수정, 매칭을 해줍니다.")
    @PutMapping
    public String updateReader(@RequestBody List<ReaderEntity> readers) {
        readerService.updateReader(readers);
        return "update";
    }
}
