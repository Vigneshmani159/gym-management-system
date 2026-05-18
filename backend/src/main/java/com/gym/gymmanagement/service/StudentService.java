package com.gym.gymmanagement.service;

import com.gym.gymmanagement.model.Student;
import com.gym.gymmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service // Marks this as a service class
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;


    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }


    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }


    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = studentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

        existing.setFullName(updatedStudent.getFullName());
        existing.setPhone(updatedStudent.getPhone());
        existing.setAddress(updatedStudent.getAddress());
        existing.setJoinDate(updatedStudent.getJoinDate());
        existing.setExpiryDate(updatedStudent.getExpiryDate());
        existing.setMembershipStatus(updatedStudent.getMembershipStatus());

        return studentRepository.save(existing);
    }


    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // Find student by register number (used for attendance)
    public Student findByRegisterNumber(String registerNumber) {
        return studentRepository.findByRegisterNumber(registerNumber)
                .orElse(null);
    }

    // Update expiry date when payment is made
    // This is called from PaymentService
    public void updateExpiryDate(String registerNumber, int durationMonths)
    {
        Student student = studentRepository.findByRegisterNumber(registerNumber).orElse(null);

        if (student != null) {
            LocalDate currentExpiry = student.getExpiryDate();
            LocalDate today = LocalDate.now();

            // If expiry is in the past, start from today
            // If expiry is in the future, extend from that date
            LocalDate startDate = (currentExpiry == null || currentExpiry.isBefore(today)) ? today : currentExpiry;

            // Add the duration months to get new expiry
            LocalDate newExpiry = startDate.plusMonths(durationMonths);
            student.setExpiryDate(newExpiry);

            // Update membership status
            student.setMembershipStatus("Active");

            studentRepository.save(student);
        }
    }

    // Get count of active members
    public long getActiveMembersCount() {
        LocalDate today = LocalDate.now();
        return studentRepository.findAll().stream()
                .filter(s -> s.getExpiryDate() != null && s.getExpiryDate().isAfter(today))
                .count();
    }

    // Get count of expired members
    public long getExpiredMembersCount() {
        LocalDate today = LocalDate.now();
        return studentRepository.findAll().stream()
                .filter(s -> s.getExpiryDate() == null || !s.getExpiryDate().isAfter(today))
                .count();
    }

    // Get list of expired members (for dashboard)
    public List<Student> getExpiredMembers() {
        LocalDate today = LocalDate.now();
        return studentRepository.findAll().stream()
                .filter(s -> s.getExpiryDate() != null && !s.getExpiryDate().isAfter(today))
                .toList();
    }
}