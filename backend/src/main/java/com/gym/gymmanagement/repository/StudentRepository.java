package com.gym.gymmanagement.repository;

import com.gym.gymmanagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// JpaRepository gives us save(), findAll(), deleteById() for free!
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Custom method: find student by register number
    Optional<Student> findByRegisterNumber(String registerNumber);
}