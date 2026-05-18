package com.gym.gymmanagement.service;

import com.gym.gymmanagement.model.Payment;
import com.gym.gymmanagement.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private StudentService studentService;


    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Add a new payment
    // Also automatically updates the student's expiry date!
    public Payment addPayment(Payment payment) {
        // Set today's date if not provided
        if (payment.getPaymentDate() == null) {
            payment.setPaymentDate(LocalDate.now());
        }

        // Generate a simple token number (P + timestamp)
        if (payment.getTokenNumber() == null || payment.getTokenNumber().isEmpty())
        {
            payment.setTokenNumber("P" + System.currentTimeMillis());
        }


        Payment saved = paymentRepository.save(payment);

        // Automatically update student's expiry date
        studentService.updateExpiryDate(payment.getRegisterNumber(), payment.getDuration());

        return saved;
    }


    public Payment updatePayment(Long id, Payment updated) {
        Payment existing = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        existing.setStudentName(updated.getStudentName());
        existing.setRegisterNumber(updated.getRegisterNumber());
        existing.setPaymentDate(updated.getPaymentDate());
        existing.setDuration(updated.getDuration());
        existing.setAmount(updated.getAmount());
        existing.setPaymentMethod(updated.getPaymentMethod());

        return paymentRepository.save(existing);
    }


    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}