package com.gym.gymmanagement.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "students")
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "register_number", unique = true)
    private String registerNumber;

    @Column(name = "full_name")
    private String fullName;

    private String phone;
    private String address;

    @Column(name = "join_date")
    private LocalDate joinDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "membership_status")
    private String membershipStatus = "Active";
}