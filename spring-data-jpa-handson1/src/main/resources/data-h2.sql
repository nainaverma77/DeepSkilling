-- Initialize table and insert records for H2
CREATE TABLE IF NOT EXISTS country (
    country_code VARCHAR(2) PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL
);

-- Delete existing records to prevent unique constraint violations on restart
DELETE FROM country;

INSERT INTO country (country_code, country_name) VALUES ('IN', 'India');
INSERT INTO country (country_code, country_name) VALUES ('US', 'United States');
INSERT INTO country (country_code, country_name) VALUES ('UK', 'United Kingdom');
