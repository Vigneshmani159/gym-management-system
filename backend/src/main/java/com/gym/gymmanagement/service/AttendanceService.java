package com.gym.gymmanagement.service;

import com.gym.gymmanagement.model.Attendance;
import com.gym.gymmanagement.model.Student;
import com.gym.gymmanagement.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentService studentService;

    // Get all attendance records
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // Mark attendance using register number
    public Map<String, Object> markAttendance(String registerNumber) {
        Map<String, Object> response = new HashMap<>();

        // Check if student exists
        Student student = studentService.findByRegisterNumber(registerNumber);

        if (student == null) {
            response.put("success", false);
            response.put("message", "Student not found with register number: " + registerNumber);
            return response;
        }

        // Create attendance record
        Attendance attendance = new Attendance();
        attendance.setStudentName(student.getFullName());
        attendance.setRegisterNumber(registerNumber);
        attendance.setAttendanceDate(LocalDate.now());
        attendance.setAttendanceTime(LocalTime.now());

        attendanceRepository.save(attendance);

        response.put("success", true);
        response.put("message", "Attendance marked for " + student.getFullName());
        response.put("studentName", student.getFullName());
        return response;
    }

    // Get today's attendance count
    public long getTodayAttendanceCount() {
        return attendanceRepository.countByAttendanceDate(LocalDate.now());
    }
}