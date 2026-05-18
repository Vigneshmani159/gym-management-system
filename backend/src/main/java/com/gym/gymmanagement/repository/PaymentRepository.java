package com.gym.gymmanagement.repository;

import com.gym.gymmanagement.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Get all payments by a specific student
    List<Payment> findByRegisterNumber(String registerNumber);

    // Calculate total income (sum of all amounts)
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p")
    BigDecimal getTotalIncome();

    // Calculate total cash payments
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.paymentMethod = 'Cash'")
    BigDecimal getTotalCashIncome();

    // Calculate total online payments
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.paymentMethod = 'Online'")
    BigDecimal getTotalOnlineIncome();

    // Get income for a specific year (e.g., 2024)
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE YEAR(p.paymentDate) = :year")
    BigDecimal getYearlyIncome(int year);

    // Get income for a specific month and year (e.g., month=1, year=2024 = January 2024)
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE MONTH(p.paymentDate) = :month AND YEAR(p.paymentDate) = :year")
    BigDecimal getMonthlyIncome(int month, int year);

    // Get count of payments for a specific month
    @Query("SELECT COUNT(p) FROM Payment p WHERE MONTH(p.paymentDate) = :month AND YEAR(p.paymentDate) = :year")
    Long getMonthlyPaymentCount(int month, int year);

    // Get total number of payments
    @Query("SELECT COUNT(p) FROM Payment p")
    Long getTotalPaymentCount();
}