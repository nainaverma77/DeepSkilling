package com.cts.springdatajpa;

import com.cts.springdatajpa.entity.Country;
import com.cts.springdatajpa.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class SpringDataJpaApplication implements CommandLineRunner {

    @Autowired
    private CountryService countryService;

    public static void main(String[] args) {
        SpringApplication.run(SpringDataJpaApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Application Started");
        System.out.println("Countries");
        List<Country> countries = countryService.getAllCountries();
        for (Country country : countries) {
            System.out.println(country.getName());
        }
    }
}
