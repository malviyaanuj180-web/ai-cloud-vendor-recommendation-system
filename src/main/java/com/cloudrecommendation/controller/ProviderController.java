package com.cloudrecommendation.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProviderController {

    @GetMapping("/api/providers")
    public List<Map<String, Object>> getProviders() {
        return List.of(
            Map.of("id", "aws", "name", "Amazon Web Services", "baseCost", 1500),
            Map.of("id", "azure", "name", "Microsoft Azure", "baseCost", 1600),
            Map.of("id", "gcp", "name", "Google Cloud", "baseCost", 1400),
            Map.of("id", "oci", "name", "Oracle Cloud Infrastructure", "baseCost", 1350),
            Map.of("id", "ibm", "name", "IBM Cloud", "baseCost", 1550),
            Map.of("id", "digitalocean", "name", "DigitalOcean", "baseCost", 700),
            Map.of("id", "linode", "name", "Akamai Cloud (Linode)", "baseCost", 750),
            Map.of("id", "alibaba", "name", "Alibaba Cloud", "baseCost", 1200)
        );
    }
}
