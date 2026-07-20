package com.archana.ai_dashboard.controller;

import com.archana.ai_dashboard.dto.ChatRequest;
import com.archana.ai_dashboard.dto.ChatResponse;
import com.archana.ai_dashboard.service.GeminiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class AIController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String answer = geminiService.askGemini(request.getMessage());

        return new ChatResponse(answer);
    }
}