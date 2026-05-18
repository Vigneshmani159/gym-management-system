package com.gym.gymmanagement.service;

import com.gym.gymmanagement.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class IncomeService {

    @Autowired
    private PaymentRepository paymentRepository;


    private static final String[] MONTH_NAMES = {
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
    };


    public Map<String, Object> getIncomeSummary() {
        Map<String, Object> summary = new HashMap<>();

        int currentYear = LocalDate.now().getYear();

        // Total income (all time)
        BigDecimal totalIncome = paymentRepository.getTotalIncome();

        // Cash payments total
        BigDecimal cashIncome = paymentRepository.getTotalCashIncome();

        // Online payments total
        BigDecimal onlineIncome = paymentRepository.getTotalOnlineIncome();

        // This year's income
        BigDecimal yearlyIncome = paymentRepository.getYearlyIncome(currentYear);

        // This month's income
        int currentMonth = LocalDate.now().getMonthValue();
        BigDecimal monthlyIncome = paymentRepository.getMonthlyIncome(currentMonth, currentYear);

        // Total number of payments
        Long totalPayments = paymentRepository.getTotalPaymentCount();

        // Average monthly income = total income / 12
        // We use BigDecimal for precise money calculations
        BigDecimal avgMonthly = BigDecimal.ZERO;
        if (totalIncome.compareTo(BigDecimal.ZERO) > 0 && totalPayments > 0) {
            avgMonthly = totalIncome.divide(BigDecimal.valueOf(12), 2, RoundingMode.HALF_UP);
        }

        summary.put("totalIncome", totalIncome);
        summary.put("cashIncome", cashIncome);
        summary.put("onlineIncome", onlineIncome);
        summary.put("yearlyIncome", yearlyIncome);
        summary.put("monthlyIncome", monthlyIncome);
        summary.put("totalPayments", totalPayments);
        summary.put("averageMonthlyIncome", avgMonthly);

        return summary;
    }

    // Get monthly breakdown for all 12 months of the current year
    public List<Map<String, Object>> getMonthlyBreakdown() {
        int currentYear = LocalDate.now().getYear();
        List<Map<String, Object>> breakdown = new ArrayList<>();

        // Loop through each month (1 = January, 12 = December)
        for (int month = 1; month <= 12; month++) {
            Map<String, Object> monthData = new HashMap<>();

            BigDecimal income = paymentRepository.getMonthlyIncome(month, currentYear);
            Long count = paymentRepository.getMonthlyPaymentCount(month, currentYear);

            monthData.put("month", MONTH_NAMES[month - 1]); // e.g., "January"
            monthData.put("monthNumber", month);
            monthData.put("income", income);
            monthData.put("paymentCount", count);

            breakdown.add(monthData);
        }

        return breakdown;
    }
}