package com.gym.gymmanagement.controller;

import com.gym.gymmanagement.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/income")
@CrossOrigin(origins = "*")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    // GET /income/summary → all income stats for dashboard cards
    @GetMapping("/summary")
    public Map<String, Object> getIncomeSummary() {
        return incomeService.getIncomeSummary();
    }

    // GET /income/monthly → monthly breakdown for all 12 months
    @GetMapping("/monthly")
    public List<Map<String, Object>> getMonthlyBreakdown() {
        return incomeService.getMonthlyBreakdown();
    }
}