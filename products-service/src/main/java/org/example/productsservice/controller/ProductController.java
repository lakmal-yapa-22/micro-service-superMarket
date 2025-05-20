package org.example.productsservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/v1/product")
@RestController

public class ProductController {
    @GetMapping("all")
    public String all() {
        return "All products";
    }
}
