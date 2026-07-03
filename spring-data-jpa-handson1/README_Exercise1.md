# Spring Data JPA Hands-on 1 – Quick Example

This project is a simple Spring Boot application that demonstrates how to connect to a database using Spring Data JPA and perform basic retrieval operations.

## Project Structure
```
spring-data-jpa-handson1
│
├── src
│   └── main
│       ├── java
│       │    └── com.cts.springdatajpa
│       │             │
│       │             ├── SpringDataJpaApplication.java (Main class)
│       │             │
│       │             ├── entity
│       │             │      Country.java (Entity mapped to "country" table)
│       │             │
│       │             ├── repository
│       │             │      CountryRepository.java (JPA Repository)
│       │             │
│       │             └── service
│       │                    CountryService.java (Service layer)
│       │
│       └── resources
│              ├── application.properties (MySQL Configuration)
│              ├── application-h2.properties (Local Verification Configuration)
│              └── data-h2.sql (H2 Test Data Insertion)
│
├── pom.xml
├── README.md
└── ScreenShot.jpeg
```

## Setup & Configuration

### Prerequisites
- JDK 17 or higher
- Maven 3.6 or higher
- MySQL Server (optional, H2 is included for offline running)

### Running with MySQL (Default Profile)
1. Open MySQL and create the database:
   ```sql
   CREATE DATABASE springdatajpa;
   ```
2. Create the `country` table and insert test data:
   ```sql
   CREATE TABLE country (
       country_code VARCHAR(2) PRIMARY KEY,
       country_name VARCHAR(100) NOT NULL
   );

   INSERT INTO country (country_code, country_name) VALUES ('IN', 'India');
   INSERT INTO country (country_code, country_name) VALUES ('US', 'United States');
   INSERT INTO country (country_code, country_name) VALUES ('UK', 'United Kingdom');
   ```
3. Update database credentials in [application.properties](src/main/resources/application.properties) if necessary.
4. Run the project:
   ```bash
   mvn spring-boot:run
   ```

### Running with H2 In-Memory Database (Verification Profile)
To run the application using the local in-memory H2 database (which creates the tables and seeds the data automatically), execute:
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=h2"
```

## Expected Output
```
Application Started
Countries
India
United States
United Kingdom
```
