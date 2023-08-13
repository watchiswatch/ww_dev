package com.example.a104.project.controller;

import com.example.a104.project.dto.DayInfoDto;
import com.example.a104.project.dto.UserDto;
import com.example.a104.project.entity.*;
import com.example.a104.project.service.AdminService;
import com.example.a104.project.service.ReaderService;
import com.example.a104.project.service.UserDateService;
import com.example.a104.project.service.UserService;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Tag(name="관리자페이지 API", description = "관리자 페이지에서 사용되는 API 입니다.")
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/admin")
@RestController
public class AdminController {
    private final AdminService adminService;
    private final UserDateService userDateService;
    private final UserService userService;
    private final ReaderService readerService;


    // 일변 운동기구별 검색량과 이용량
    @Operation(summary = "일별, 운동기구별 검색량과 이용량",description = "헬스장 이용객들이 실제로 이용한 데이터와 검색 데이터를 가지고 관리자 페이지에서 시각화할수 있도록 제공하는 데이터")
    @Parameters({
            @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT"),
            @Parameter(name="date", description = "YYYY-MM-DD 형식의 날짜 데이터, 타입은 문자열")
    })
    @GetMapping("day-info")
    public List<DayInfoDto> getDayInfo(@RequestHeader(value = "Authorization") String token,@RequestParam String date){
        List<DayInfoDto> dayInfoDtoList = new ArrayList<>();
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        List<ReaderEntity> readerVoList = readerService.getMatchReaders(gymCode);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        for(ReaderEntity readerVo: readerVoList){
            DayInfoDto dayInfoDto = new DayInfoDto();
            dayInfoDto.setName(readerVo.getName());
            dayInfoDto.setSearchCount(adminService.getDaySearch(readerVo,localDate));
            dayInfoDto.setUsingCount(adminService.getDayUsing(readerVo,localDate));
            dayInfoDtoList.add(dayInfoDto);
        }
        return dayInfoDtoList;
    }

    // 헬스장 회원 검색(이름으로 검색)
    @Operation(summary = "헬스장 회원 검색",description = "검색란에 키워드를 입력하면 키워드를 포함한 이름을 가진 이용자들을 반환해줌")
    @Parameters({
            @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT"),
            @Parameter(name="keyword", description = "검색할 키워드 문자열")
    })
    @GetMapping("search")
    public List<UserEntity> search(@RequestHeader(value = "Authorization") String token, @RequestParam String keyword) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        List<UserEntity> users = adminService.search(keyword, gymCode);
        return users;
    }

    // 헬스장 회원 삭제
    @Operation(summary = "헬스장 회원 삭제",description = "삭제할 회원의 ID 를 입력 받아 해당 회원 삭제 (등록된 헬스장이 삭제)")
    @Transactional
    @PutMapping("users")
    public String delete(@RequestBody Map<String, String> map) {
        // 회원의 gymCode 와 regist 모두 null 로 초기화
        userService.DeleteUser(map.get("id"));
        // 회원의 탈퇴 날짜 저장
        int userId = userDateService.createUserId(map.get("id"));
        userDateService.dropout(userId);
        return "Delete Success";
    }

    // 헬스장 등록 회원 승인
    @Operation(summary = "헬스장 등록 회원 승인",description = "헬스장을 등록 신청한 회원을 승인해주는 API")
    @Modifying
    @Transactional
    @PutMapping("approval")
    public String approval(@RequestHeader(value = "Authorization") String token, @RequestBody Map<String, String> map) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        String id = map.get("id");
        adminService.approval(1, id);

        // 승인 후 승인 날짜 저장
        int userId = userDateService.createUserId(id);
        userDateService.accessAdmin(userId);
        return "Success";
    }

    // 헬스장 등록은 했지만 승인되지 않은 사용자 목록
    @Operation(summary = "헬스장 등록 신청 한 회원 목록",description = "헬스장에 등록 신청을 했지만 아직 승인이 되지 않은 사용자 목록을 반환해준다.")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping("unauthorized-users")
    public List<UserDto> unAutorizedUsers(@RequestHeader(value = "Authorization") String token) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        List<UserEntity> users = adminService.unauthorizedUser(gymCode);
        List<UserDto> userDtoList = new ArrayList<>();
        for(UserEntity userVo: users){
            UserDto userDto = new UserDto();
            userDto.setDate(userDateService.getUserDate(userVo.getUserId()));
            userDto.setUserId(userVo.getUserId());
            userDto.setName(userVo.getName());
            userDto.setId(userVo.getId());
            userDtoList.add(userDto);
        }
        return userDtoList;
    }

    // 헬스장 등록 후 승인 완료된 사용자 목록록
    @Operation(summary = "헬스장 등록 신청 한 회원 목록",description = "헬스장에 등록 신청을 했지만 아직 승인이 되지 않은 사용자 목록을 반환해준다.")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping("users")
    public List<UserEntity> userList(@RequestHeader(value = "Authorization") String token) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        List<UserEntity> userList = adminService.userList(gymCode);
        return userList;
    }

    @Operation(summary = "관리자 로그인",description = "아이디와 비밀번호를 입력받아 로그인.")
    @PostMapping("login")
    public TokenResponse login(@RequestBody Map<String, String> map) {
        List<AdminEntity> admin = adminService.login(map.get("id"));

        TokenDataResponse tokenDataResponse;
        TokenResponse tokenResponse;
        try {
            if (admin.size() != 0 && admin.get(0).getPassword().equals(map.get("password"))) {
                String token = JwtTokenProvider.createToken(admin.get(0).getId()); // 토큰 생성
                Claims claims = JwtTokenProvider.parseJwtToken("Bearer " + token); // 토큰 검증
                tokenDataResponse = new TokenDataResponse(token, claims.getSubject(), admin.get(0).getName(),null,admin.get(0).getName(),
                        claims.getIssuedAt().toString(), claims.getExpiration().toString());
                tokenResponse = new TokenResponse("200", "OK", tokenDataResponse);

                return tokenResponse;
            }
        } catch (Exception siginError) {

        }

        tokenResponse = new TokenResponse("202", "FAIL", "FAIL");
        return tokenResponse;
    }


    @PostMapping("create")
    public ResponseEntity<AdminEntity> createAdmin(@RequestBody Map<String, Object> map) {
        AdminEntity admin = AdminEntity.builder()
                .gymCode((int) map.get("code"))
                .id((String) map.get("id"))
                .name((String) map.get("name"))
                .password((String) map.get("password"))
                .build();
        AdminEntity savedAdmin = adminService.createAdmin(admin);
        return new ResponseEntity<>(savedAdmin, HttpStatus.OK);
    }

}
