package com.gym.gymmanagement.controller;

import com.gym.gymmanagement.model.Student;
import com.gym.gymmanagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController           // Marks this as a REST API controller
@RequestMapping("/students") // All URLs start with /students
@CrossOrigin(origins = "*")  // Allow React frontend to call this
public class StudentController {

    @Autowired
    private StudentService studentService;


    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }


    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }


    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }


    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", studentService.getAllStudents().size());
        stats.put("activeMembers", studentService.getActiveMembersCount());
        stats.put("expiredMembers", studentService.getExpiredMembersCount());
        stats.put("expiredMembersList", studentService.getExpiredMembers());
        return stats;
    }
}