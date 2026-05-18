package com.gym.gymmanagement.repository;

import com.gym.gymmanagement.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Find attendance by register number
    List<Attendance> findByRegisterNumber(String registerNumber);

    // Find attendance by date
    List<Attendance> findByAttendanceDate(LocalDate date);

    // Count attendance for today
    Long countByAttendanceDate(LocalDate date);
}