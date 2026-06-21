# Factory Method Pattern Example

This project demonstrates the implementation of the **Factory Method Design Pattern** in Java, as part of Exercise 2.

## Scenario
A document management system needs to create different types of documents (e.g., Word, PDF, Excel) without the client code needing to know the specific class being instantiated.

## Project Structure
- `src/Document.java`: The main product interface defining common document operations.
- `src/WordDocument.java`, `src/PdfDocument.java`, `src/ExcelDocument.java`: Specific document interfaces extending `Document`.
- `src/ConcreteWordDocument.java`, `src/ConcretePdfDocument.java`, `src/ConcreteExcelDocument.java`: Concrete document implementations.
- `src/DocumentFactory.java`: Abstract creator class declaring the factory method `createDocument()`.
- `src/WordDocumentFactory.java`, `src/PdfDocumentFactory.java`, `src/ExcelDocumentFactory.java`: Concrete creator classes implementing the factory method to instantiate corresponding document types.
- `src/DocumentTest.java`: The test driver class to verify that the factory method pattern instantiates and operates on different document types properly.

## Design Details
1. **Product Interface (`Document`)**: Standardizes operations like `open()`, `save()`, and `close()`.
2. **Concrete Products**: Subclasses of `Document` (e.g., `ConcreteWordDocument`, `ConcretePdfDocument`, `ConcreteExcelDocument`) that override the standard operations and introduce type-specific actions.
3. **Creator (`DocumentFactory`)**: Defines `createDocument()` which returns a `Document` interface.
4. **Concrete Creators**: Overrides the creator method to return concrete implementations, decoupling object creation from the client code.

## Compilation and Execution

To compile the project, run the following command from the project root:
```bash
javac -d bin src/*.java
```

To run the test verification, run:
```bash
java -cp bin DocumentTest
```
