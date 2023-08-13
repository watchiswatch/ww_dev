package com.example.a104.project.service;

import com.example.a104.project.entity.ReaderStateEntity;
import com.example.a104.project.entity.ReservationEntity;
import com.example.a104.project.entity.TagInfoEntity;
import com.example.a104.project.entity.UserEntity;
import com.example.a104.project.repository.*;
import com.example.a104.project.util.MqttConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    private final ReaderRepository readerRepository;
    private final ReaderStateRepository readerStateRepository;
    private final ReservationRepository reservationRepository;
    private final TagInfoRepository tagInfoRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public void Tagging(String deviceCode, String reader) {
        ReaderStateEntity readerState = readerStateRepository.findByReader(reader);
        List<ReservationEntity> reservation = reservationRepository.findByReaderOrderByReservationAsc(reader);
        UserEntity user = userRepository.findByDeviceCode(deviceCode);
        // 기구 상태 [0: 사용중], [1: 미사용(대기X)], [2:미사용(대기O)]

        // 1. 해당 기구 미사용 상태
        if (readerState == null || readerState.getState() != 0) {
            // 해당 기구 예약자가 있는 경우 (#001)
            if (reservation.size() != 0) {
                // 내가 예약이 있는 경우
                if (reservationRepository.findByUserId(user.getUserId()) != null) {
                    // 내가 해당 기구 예약중
                    ReservationEntity reservationVo = reservationRepository.findByUserId(user.getUserId());
                    if (user.getUserId() == reservationVo.getUserId() && reader.equals(reservationVo.getReader())) {
                        // 내가 예약 1순번
                        if (reservation.get(0).getUserId() == user.getUserId()) {
                            // 내가 다른 기구를 사용중인 상태 => 기존 사용과 예약을 취소 후 새로 사용으로 등록(#001_1)
                            if (readerStateRepository.findByUserId(user.getUserId()) != null) {
                                // 해당 기구 예약 삭제
                                reservationRepository.deleteByUserId(user.getUserId());
                                // 기존 사용중이던 기구 종료 시간 저장
                                LocalDateTime startTime = tagInfoRepository
                                        .getStartDate(LocalDate.now(), user.getUserId(),
                                                readerStateRepository.findByUserId(user.getUserId()).getReader())
                                        .get(0).getStartTime();
                                tagInfoRepository.setEndTime(LocalDateTime.now(), startTime);
                                // 기존 사용중이던 상태 삭제 후 MQTT 로 해당 기구에 대해 예약이 있는 경우 다음 사람에게 MQTT 송신 필요함 
                                ReaderStateEntity readers = readerStateRepository.findByUserId(user.getUserId()); // 현재
                                // 사용중이던
                                // 리더기 정보

                                // 취소(종료) 되는 기구의 다음 예약자 있는 경우 => 다음 순번 사람에게 MQTT 송신 => 기존 기구 상태 2로 변경, 회원번호
                                // null로 변경 (#001_1(1))
                                List<ReservationEntity> reservationList = reservationRepository
                                        .findByReaderOrderByReservationAsc(readers.getReader());
                                if (reservationList.size() != 0) {
                                    MqttConfig mqtt = new MqttConfig(userRepository, reservationRepository,
                                            readerStateRepository);

                                    mqtt.init("tcp://13.124.11.62:1883", deviceCode);
                                    readerStateRepository.ExistReservation(readers.getReader());
                                    int userId = reservationList.get(0).getUserId();
                                    String topic = userRepository.findByUserId(userId).getDeviceCode();
                                    // =============TOPIC 전송 ========================
                                    mqtt.send(topic, "your turn");
                                    mqtt.send(deviceCode, "end");
                                    mqtt.close();
                                    // 위의 토픽으로 다음 순번 사람에게 송신
                                    //
                                }
                                // 취소 되는 기구의 다음 예약자가 없는ㄱ ㅕㅇ우 => 기존 기구 상태 1로 변경, 회원번호 null로 변경 (#001_1(2))
                                else {
                                    readerStateRepository.nExistReservation(readers.getReader());
                                }

                                // 취소 되는 기구의 다음 예약자가 없는 경우는 패스


                                // 새로 사용중인 상태로 등록
                                ReaderStateEntity readerStateVo = new ReaderStateEntity(reader, 0, user.getUserId());

                                // =============메시지 off 전송====================
                                MqttConfig mqtt = new MqttConfig(userRepository, reservationRepository, readerStateRepository);
                                mqtt.init("tcp://13.124.11.62:1883", deviceCode);
                                mqtt.send(deviceCode, "off");
                                mqtt.close();
                                //-----------------------------------------------------------------------

                                readerStateRepository.save(readerStateVo);
                                // 새로운 기구 사용 시작 시간 설정
                                TagInfoEntity tagInfoVo = TagInfoEntity.builder()
                                        .primaryKey(null)
                                        .tagDate(LocalDate.now())
                                        .userId(user.getUserId())
                                        .reader(reader)
                                        .startTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                                        .build();

                                tagInfoRepository.save(tagInfoVo);

                            }
                            // 내가 사용중이지 않은 상태 => 기존 예약을 취소 후 사용중인 상태로 등록 (#001_2)
                            else {
                                // 해당 기구 예약 삭제
                                reservationRepository.deleteByUserId(user.getUserId());
                                // 새로 사용중인 상태로 등록
                                ReaderStateEntity readerStateVo = new ReaderStateEntity(reader, 0, user.getUserId());

                                // =============메시지 off 전송====================
                                MqttConfig mqtt = new MqttConfig(userRepository, reservationRepository, readerStateRepository);
                                mqtt.init("tcp://13.124.11.62:1883", deviceCode);
                                mqtt.send(deviceCode, "off");
                                mqtt.close();
                                //-----------------------------------------------------------------------

                                readerStateRepository.save(readerStateVo);
                                // 새로운 기구 사용 시작 시간 설정
                                TagInfoEntity tagInfoVo = TagInfoEntity.builder()
                                        .primaryKey(null)
                                        .tagDate(LocalDate.now())
                                        .userId(user.getUserId())
                                        .reader(reader)
                                        .startTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                                        .build();

                                tagInfoRepository.save(tagInfoVo);
                            }
                        }
                        // 예약 1순번이 아닌 경우 무시 (#001_3)

                    }

                    // 내가 다른 기구 예약중 => 기존 예약 취소 후 예약 새로 생성 (#001_4)
                    else {
                        reservationRepository.deleteByUserId(user.getUserId());
                        reservationRepository.save(new ReservationEntity(reader, user.getUserId(), LocalDateTime.now(ZoneId.of("Asia/Seoul"))));
                    }
                }
                // 내가 예약이 없는 경우 (#001_5)
                else if (reservationRepository.findByUserId(user.getUserId()) == null) {
                    ReservationEntity reservationVo = new ReservationEntity(reader, user.getUserId(), LocalDateTime.now(ZoneId.of("Asia/Seoul")));
                    reservationRepository.save(reservationVo);
                }
                ReaderStateEntity readerStateVo = new ReaderStateEntity(reader,0,user.getUserId());
                readerStateRepository.save(readerStateVo);
            }
            // 해당 기구 예약자가 없는 경우 (#002)
            else {
                // 내가 사용중인 상태 (#002_1)
                if (readerStateRepository.findByUserId(user.getUserId()) != null) {
                    // 기존 사용 종료 후 새로 사용 시작
                    LocalDateTime startTime = tagInfoRepository
                            .getStartDate(LocalDate.now(), user.getUserId(),
                                    readerStateRepository.findByUserId(user.getUserId()).getReader())
                            .get(0).getStartTime();
                    tagInfoRepository.setEndTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")), startTime);
                    // 기존 사용중이던 상태 삭제 후 MQTT 로 해당 기구에 대해 예약이 있는 경우 다음 사람에게 MQTT 송신 필요함
                    ReaderStateEntity readers = readerStateRepository.findByUserId(user.getUserId()); // 현재 사용중이던 리더기 정보

                    // 취소(종료) 되는 기구의 다음 예약자 있는 경우 => 다음 순번 사람에게 MQTT 송신 => 기존 기구 상태 2로 변경, 회원번호
                    // null로 변경
                    List<ReservationEntity> reservationList = reservationRepository
                            .findByReaderOrderByReservationAsc(readers.getReader());
                    if (reservationList.size() != 0) {
                        MqttConfig mqtt = new MqttConfig(userRepository, reservationRepository, readerStateRepository);
                        mqtt.init("tcp://13.124.11.62:1883", deviceCode);
                        readerStateRepository.ExistReservation(readers.getReader());
                        int userId = reservationList.get(0).getUserId();
                        String topic = userRepository.findByUserId(userId).getDeviceCode();
                        // =============TOPIC 전송 ========================
                        mqtt.send(topic, "your turn");
                        mqtt.send(deviceCode, "end");
                        mqtt.close();
                        // 위의 토픽으로 다음 순번 사람에게 송신
                        //
                    }
                    // 취소 되는 기구의 다음 예약자가 없는 경_우 => 기존 기구 상태 1로 변경, 회원번호 null로 변경
                    else {
                        readerStateRepository.nExistReservation(readers.getReader());
                    }

                    ReaderStateEntity readerStateVo = new ReaderStateEntity(reader,0,user.getUserId());
                    readerStateRepository.save(readerStateVo);
                    TagInfoEntity tagInfoVo = TagInfoEntity.builder()
                            .primaryKey(null)
                            .tagDate(LocalDate.now())
                            .userId(user.getUserId())
                            .reader(reader)
                            .startTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                            .build();
                    tagInfoRepository.save(tagInfoVo);

                }
                // 아무것도 사용중이지 않은 상태 (#002_2)
                else {
                    // 기구 사용 시작
                    ReaderStateEntity readerStateVo = new ReaderStateEntity(reader, 0, user.getUserId());

                    // =============메시지 off 전송====================
                    MqttConfig mqtt = new MqttConfig(userRepository, reservationRepository, readerStateRepository);
                    mqtt.init("tcp://13.124.11.62:1883", deviceCode);


                    mqtt.send(deviceCode, "off");
                    mqtt.close();
                    //-----------------------------------------------------------------------

                    readerStateRepository.save(readerStateVo);
                    // 새로운 기구 사용 시작 시간 설정
                    TagInfoEntity tagInfoVo = TagInfoEntity.builder()
                            .primaryKey(null)
                            .tagDate(LocalDate.now())
                            .userId(user.getUserId())
                            .reader(reader)
                            .startTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                            .build();

                    tagInfoRepository.save(tagInfoVo);
                }
            }
        }

        // ================================================================================================================================================

        // 1. 해당 기구 사용중 상태
        else {
            // 내가 사용중인 경우 (= 종료) (#003)
            if (readerState.getUserId() == user.getUserId()) {
                // 태깅 정보 테이블에 종료 시간 추가 해줘야한다.
                LocalDateTime startTime = tagInfoRepository.getStartDate(LocalDate.now(), user.getUserId(), reader)
                        .get(0).getStartTime();
                tagInfoRepository.setEndTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")), startTime);

                // 해당 기구 예약이 있는경우 미사용(대기O)상태로 변경 (#003_1)
                if (reservation.size() != 0) {
                    MqttConfig mqtt = new MqttConfig(userRepository, reservationRepository, readerStateRepository);
                    mqtt.init("tcp://13.124.11.62:1883", deviceCode);
                    ReaderStateEntity readerStateVo = new ReaderStateEntity(reader, 2, null);
                    readerStateRepository.save(readerStateVo);
                    // 다음 사람에게 알람 주는 로직 (MQTT) => 먼저 예약 테이블에서 해당 기구의 예약자 중 최신 사람을 찾아야함
                    // 예약자 중 최신 사람 찾기
                    ReservationEntity next = reservation.get(0);
                    String topic = userRepository.findByUserId(next.getUserId()).getDeviceCode();
                    mqtt.send(topic, "your turn");
                    mqtt.send(deviceCode, "end");
                    mqtt.close();
                    // =============TOPIC 전송 ========================
                    // 1. 위에서 디바이스코드(= topic)을 알아내었으므로 해당 토픽(=디바이스코드)으로 mqtt 송신
                    // 수신하는 디바이스는 자신 차례가 왔다는 뜻
                    // 2. 기존 예약을 취소한 디바이스코드 (=topic) 에도 종료라는 신호 송신
                    // MQTT 송신 코드 작성 부분
                    //
                }
                // 해당 기구 예약이 없는경우 미사용(대기X)상태로 변경 (#003_2)
                else {
                    //readerStateRepository.nExistReservation(reader);
                    ReaderStateEntity readerStateVo = new ReaderStateEntity(reader, 1, null);
                    readerStateRepository.save(readerStateVo);
                    // 기존 예약을 취소한 디바이스코드 (=topic) 에도 종료라는 신호 송신 MQTT
                    //
                }
            }
            // 내가 사용중이 아닌 경우 (#004)
            else {
                // 내가 예약이 있는 경우
                if (reservationRepository.findByUserId(user.getUserId()) != null) {
                    // 다른 기구를 예약중이면 기존 예약 취소 후 새로 예약 (#004_1)
                    if (!reservationRepository.findByUserId(user.getUserId()).getReader().equals(reader)) {
                        reservationRepository.deleteByUserId(user.getUserId());
                        ReservationEntity reservationVo = new ReservationEntity(reader, user.getUserId(), LocalDateTime.now(ZoneId.of("Asia/Seoul")));
                        reservationRepository.save(reservationVo);
                    }
                    // 아닌 경우는 무시 (#004_2)

                }
                // 내가 예약이 없는경우 예약하기 (#004_3)
                else {
                    ReservationEntity reservationVo = new ReservationEntity(reader, user.getUserId(), LocalDateTime.now(ZoneId.of("Asia/Seoul")));
                    reservationRepository.save(reservationVo);
                }
            }

        }

    }

}
