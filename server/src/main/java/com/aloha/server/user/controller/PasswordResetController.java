package com.aloha.server.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.aloha.server.user.dto.PasswordResetToken;
import com.aloha.server.user.service.UserService;

import java.util.Map;

@Controller
@RequestMapping("/password")
public class PasswordResetController {

    @Autowired
    private UserService userService;

    @GetMapping("/reset")
    public ResponseEntity<String> showResetPage(@RequestParam("token") String token) {
        PasswordResetToken passwordResetToken = userService.getPasswordResetToken(token);

        if (passwordResetToken == null || passwordResetToken.isExpired()) {
            return ResponseEntity.status(400).body("Invalid or expired password reset token");
        }

        // Render the password reset page
        // This would be an actual HTML page in a real application
        return ResponseEntity.ok("Render password reset page");
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");

        PasswordResetToken passwordResetToken = userService.getPasswordResetToken(token);

        if (passwordResetToken == null || passwordResetToken.isExpired()) {
            return ResponseEntity.status(400).body("Invalid or expired password reset token");
        }

        userService.updatePassword(passwordResetToken.getEmail(), newPassword);

        return ResponseEntity.ok("Password updated successfully");
    }
}

