package com.futurumtech.app.controller;

import com.futurumtech.app.model.enums.Keywords;
import com.futurumtech.app.model.enums.Status;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("utils")
public class UtilsController {

    @GetMapping("/statuses")
    public List<Status> getAllStatuses() {
        return Arrays.asList(Status.values());
    }

    @GetMapping("/keywords")
    public List<Keywords> getAllKeywords() {
        return Arrays.asList(Keywords.values());
    }
}
