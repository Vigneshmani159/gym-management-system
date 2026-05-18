package com.gym.gymmanagement.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendance")
@Data
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "register_number")
    private String registerNumber;

    @Column(name = "attendance_date")
    private LocalDate attendanceDate;

    @Column(name = "attendance_time")
    private LocalTime attendanceTime;
}