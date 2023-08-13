package com.example.a104.project.repository;

import com.example.a104.project.entity.TagInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TagInfoRepository extends JpaRepository<TagInfoEntity, Integer> {

    @Query("select t from TagInfoEntity t  where function('date_format', t.tagDate, '%Y-%m') = :tagDate and t.userId = :userId")
    List<TagInfoEntity> getRecord(String tagDate, int userId);

    @Query("select  t from TagInfoEntity t  where t.tagDate = :tagDate and t.userId = :userId and t.reader = :reader order by t.startTime desc ")
    List<TagInfoEntity> getStartDate(LocalDate tagDate, int userId, String reader);

    @Modifying
    @Transactional
    @Query("update TagInfoEntity t set t.endTime = :endTime where t.startTime = :startTime")
    void setEndTime(@Param("endTime") LocalDateTime endTime, @Param("startTime") LocalDateTime startTime);

    List<TagInfoEntity> findByReaderAndTagDate(String reader, LocalDate date);

    List<TagInfoEntity> findByUserIdAndReaderAndEndTimeIsNullOrderByStartTimeAsc(int userId, String reader);

    @Query(value = "select t.user_id, sum(TIMESTAMPDIFF(SECOND, t.start_time,t.end_time)) as seconds from tag_info t, user u where year(t.tag_date) = :year and month(t.tag_date) = :month and t.user_id = u.user_id  and u.gym_code = :gymCode group by t.user_id order by seconds desc ",nativeQuery = true)
    List<Object[]> getRank(int year,int month, int gymCode); // 월별로 구분아직 안함
}
