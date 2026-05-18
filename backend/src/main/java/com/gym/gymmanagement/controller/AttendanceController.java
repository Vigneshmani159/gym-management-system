package com.gym.gymmanagement.controller;

import com.gym.gymmanagement.model.Attendance;
import com.gym.gymmanagement.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;


    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    // POST /attendance → mark attendance
    // Body: { "registerNumber": "GYM001" }
    @PostMapping
    public Map<String, Object> markAttendance(@RequestBody Map<String, String> body) {
        String registerNumber = body.get("registerNumber");
        return attendanceService.markAttendance(registerNumber);
    }


    @GetMapping("/today")
    public Map<String, Object> getTodayCount() {
        Map<String, Object> result = new HashMap<>();
        result.put("todayCount", attendanceService.getTodayAttendanceCount());
        return result;
    }
}