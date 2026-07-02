package com.library.service;

import com.library.repository.BookRepository;

public class BookService {
    private BookRepository bookRepository;

    // Setter method for Spring to inject BookRepository dependency
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void registerBook() {
        System.out.println("Registering a new book via BookService...");
        // Call method on the dependency to show DI is working
        bookRepository.saveBook();
    }
}
