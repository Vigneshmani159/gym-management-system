package com.gym.gymmanagement.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "payments")
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token_number")
    private String tokenNumber;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "register_number")
    private String registerNumber;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    private Integer duration; // Number of months

    private BigDecimal amount;

    @Column(name = "payment_method")
    private String paymentMethod; // "Cash" or "Online"
}