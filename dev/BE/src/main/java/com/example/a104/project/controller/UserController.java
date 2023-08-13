package com.example.a104.project.controller;

import com.example.a104.project.dto.MonthRanking;
import com.example.a104.project.dto.SearchDataDto;
import com.example.a104.project.dto.TagInfoDto;
import com.example.a104.project.entity.*;
import com.example.a104.project.repository.AdminRepository;
import com.example.a104.project.service.*;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name="이용자페이지 API", description = "이용자 페이지에서 사용되는 API 입니다.")
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {
    private final UserService userService;
    private final UserDateService userDateService;
    private final AdminRepository adminRepository;
    private final ReaderService readerService;
    private final ReservationService reservationService;
    private final CountService countService;
    private final WaitService waitService;

    // 헬스장에 매칭된 리더기 보여주기
    @Operation(summary = "기구와 매칭된 리더기 목록",description = "헬스장에 기구와 리더기가 매칭된 리더기 목록을 반환합니다..")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping("readers")
    public List<ReaderEntity> MatchReaders(@RequestHeader(value = "Authorization") String token){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        UserEntity user = userService.getUserInfo(id);
        int gymCode = user.getGymCode();
        return readerService.getMatchReaders(gymCode);

    }

    // 기구랑 시간 선택 후 클릭하면 기구와 해당 날짜 카운트 + 1 AND 현재 선택 기구의 대기인원과 1주일 2주일 3주일전 대기인원 반환
    @Operation(summary = "선택 기구의 현재 대기인원과 1,2,3 주전 대기인원",description = "사용자가 기구와 시간을 선택하면 현재 기구의 대기인원과 1,2,3주일 전의 그 시간에 대기인원을 반환.")
    @Parameters({
            @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT"),
            @Parameter(name="date", description = "HH:mm 형식의 시간, 분 데이터 (타입은 문자열)"),
            @Parameter(name="reader", description = "리더기 번호")
    })
    @GetMapping("search")
    public SearchDataDto searchDataDto(@RequestHeader(value = "Authorization") String token, @RequestParam String date, String reader){
        SearchDataDto searchDataDto = new SearchDataDto();
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        UserEntity user = userService.getUserInfo(id);
        int gymCode = user.getGymCode();
        String name = readerService.getReader(reader).getName();

        List<CountEntity> countVo = countService.CountList(LocalDate.now(),name);
        // 검색 시 카운트 +1 하는 부분
        // db 에 정보가 없는 경우
        if(countVo.size()==0){
            CountEntity countVo1 = CountEntity.builder()
                    .count(1)
                    .search(LocalDate.now())
                    .name(name)
                    .gymCode(gymCode)
                    .build();
            countService.save(countVo1);
        }
        else{
            countService.Count(LocalDate.now(),name);
        }
        // 검색 시 카운트 +1 하는 부분 끝

        // 현재 기구의 대기인원과 1주일 2주일 3주일 전 대기 인원 반환
        List<ReservationEntity> reservationVoList = reservationService.getReservationList(reader);
        searchDataDto.setNow(reservationVoList.size());
        String datetime = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd "))+date;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime date2 = LocalDateTime.parse(datetime,formatter);

        String week1  = date2.minusDays(7).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        String week2  = date2.minusDays(14).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        String week3  = date2.minusDays(21).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

        searchDataDto.setWeek(waitService.getWeek(week1,reader));
        searchDataDto.setWeek2(waitService.getWeek(week2,reader));
        searchDataDto.setWeek3(waitService.getWeek(week3,reader));
        return searchDataDto;
    }


    @Operation(summary = "현재 헬스장 이용자 수",description = "현재 헬스장을 이용하는 사람들의 숫자를 반환합니다.")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping("using-gym")
    public int countUsers(@RequestHeader(value = "Authorization") String token){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        int gymCode = userService.getUserInfo(id).getGymCode();
        int count = userService.countUsers(gymCode);
        return count;

    }

    @Operation(summary = "현재 헬스장을 등록했는지 여부",description = "회원가입을 하고 헬스장에 등록을 했는지 안했는지 파악하기 위해 유저정보 반환.")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping("regist")
    public UserEntity userInfo(@RequestHeader(value = "Authorization") String token){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        return userService.getUserInfo(id);
    }

    @Operation(summary = "사용자의 운동 기록",description = "해당 년,월에 사용자의 운동기록에 대한 데이터를 반환합니다.")
    @Parameters({
            @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT"),
            @Parameter(name="date", description = "YY-MM 형식의 년, 월 데이터 (타입은 문자열)"),

    })
    @GetMapping("records")
    public List<TagInfoDto> userDate(@RequestHeader(value = "Authorization") String token, @RequestParam String date){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        int userId = userDateService.createUserId(id);
        List<TagInfoEntity> list = userService.getUserDate(date,userId);
        userService.getTagInfo(list);
        return  userService.getTagInfo(list);
    }
    // 헬스장 등록
    @Operation(summary = "헬스장 등록",description = "사용자가 헬스장코드를 입력 하여 등록합니다.")
    @Transactional
    @PutMapping("regist-gym")
    public Map<String, String> RegistGym(@RequestHeader(value = "Authorization") String token,
            @RequestBody Map<String, String> map) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        userService.UpdateGymCode(Integer.valueOf(map.get("gym_code")), id);
        int userId = userDateService.createUserId(id);
        userDateService.accessUser(userId);
        Map<String, String> returnMsg = new HashMap<>();
        returnMsg.put("msg", "헬스장등록완료");
        return returnMsg;

    }

    // 중복체크
    @Operation(summary = "아이디 중복체크",description = "아이디가 중복인지 아닌지 반환해줍니다..")
    @Parameter(name="id", description = "사용자가 작성한 아이디")
    @GetMapping("check")
    @ResponseBody
    public Map<String, String> DuplicateCheck(@RequestParam String id) {
        Map<String, String> map = new HashMap<>();
        if (userService.checkId(id)) {
            map.put("msg", "이미 있는 아이디");
        } else {
            map.put("msg", "사용가능");

        }

        return map;

    }

    // 로그인
    @Operation(summary = "사용자 로그인",description = "아이디와 비밀번호를 입력받아 로그인.")
    @PostMapping("login")
    public TokenResponse login(@RequestBody Map<String, String> map) {
        List<UserEntity> user = userService.login(map.get("id"));
        TokenDataResponse tokenDataResponse;
        TokenResponse tokenResponse;
        try {
            if (user.size() != 0 && BCrypt.checkpw(map.get("password"), user.get(0).getPassword())) {
                String token = JwtTokenProvider.createToken(user.get(0).getId()); // 토큰 생성
                Claims claims = JwtTokenProvider.parseJwtToken("Bearer " + token); // 토큰 검증
                String gymName;
                try {
                    gymName = adminRepository.findByGymCode(user.get(0).getGymCode()).getName();
                }
                catch (Exception e){
                    gymName = null;
                }
                tokenDataResponse = new TokenDataResponse(token, claims.getSubject(), user.get(0).getName(), user.get(0).getRegist(), gymName,
                        claims.getIssuedAt().toString(), claims.getExpiration().toString());
                tokenResponse = new TokenResponse("200", "OK", tokenDataResponse);
                return tokenResponse;

                }

        } catch (Exception exception) {
            System.out.println(exception.getMessage());
        }
        tokenResponse = new TokenResponse("200", "FAIL", "FAIL");
        return tokenResponse;

        }

    @GetMapping("rank")
    public List<MonthRanking> rank(@RequestHeader(value = "Authorization") String token, String date){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        int gymCode = userService.getUserInfo(id).getGymCode();
        List<UserEntity> userEntityList = userService.getGymUsers(gymCode);
        String [] dateArr = date.split("-");
        int month = Integer.valueOf(dateArr[1]);
        int year = Integer.valueOf(dateArr[0]);
        List<MonthRanking> monthRankingList = userService.getMonthRanking(year,month, gymCode);
        return monthRankingList;
    }

    @PostMapping("signup")
    public ResponseEntity<UserEntity> singUp(@RequestBody Map<String, String> map) {
        UserEntity user = UserEntity.builder()
                .id(map.get("id"))
                .password(BCrypt.hashpw(map.get("password"), BCrypt.gensalt()))
                .email(map.get("email"))
                .phoneNumber(map.get("phone_number"))
                .sex(map.get("sex"))
                .name(map.get("name"))

                .build();
        UserEntity savedUser = userService.createUser(user);

        int userId = userDateService.createUserId(map.get("id"));
        UserDateEntity userDate = UserDateEntity.builder()
                .userId(userId)
                .signin(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build();
        userDateService.createUserDate(userDate);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }
}
