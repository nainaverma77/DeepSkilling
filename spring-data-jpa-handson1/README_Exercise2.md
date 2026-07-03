# Exercise 2: Difference between JPA, Hibernate and Spring Data JPA

## Objective

The objective of this exercise is to understand the difference between JPA, Hibernate, and Spring Data JPA.

---

## What is JPA?

JPA (Java Persistence API) is a Java specification for Object Relational Mapping (ORM). It defines a standard way to map Java objects to database tables.

Key Points:
- It is a specification.
- It is not a framework.
- It provides interfaces and annotations.
- It requires an implementation such as Hibernate.

---

## What is Hibernate?

Hibernate is an ORM framework and one of the most popular implementations of JPA.

Key Points:
- It implements JPA.
- It provides HQL (Hibernate Query Language).
- It handles database operations automatically.
- It reduces JDBC code.

---

## What is Spring Data JPA?

Spring Data JPA is a Spring module built on top of JPA.

Key Points:
- Simplifies database operations.
- Uses JpaRepository.
- Automatically generates SQL queries.
- Reduces boilerplate code.

---

## Difference

| Feature | JPA | Hibernate | Spring Data JPA |
|---------|-----|-----------|-----------------|
| Type | Specification | Framework | Spring Module |
| Developed By | Oracle | Hibernate Team | Spring |
| Implementation | No | Yes | Uses JPA |
| Query Support | JPQL | HQL + JPQL | Repository Methods |
| Boilerplate Code | High | Medium | Very Low |

---

## Relationship

```
Spring Data JPA
        │
        ▼
     Uses JPA
        │
        ▼
Hibernate (Implementation)
        │
        ▼
  MySQL Database
```

---

## Advantages

### JPA
- Standard API
- Portable
- Easy to switch implementations

### Hibernate
- Powerful ORM
- HQL support
- Caching support

### Spring Data JPA
- Easy CRUD operations
- Less code
- Repository support
- Automatic query generation

---

## Conclusion

JPA is a specification.

Hibernate is an implementation of JPA.

Spring Data JPA is built on top of JPA and simplifies database programming by providing repositories and automatic query generation.
