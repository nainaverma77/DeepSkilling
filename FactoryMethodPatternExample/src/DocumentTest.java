public class DocumentTest {
    public static void main(String[] args) {
        System.out.println("=== Testing Factory Method Pattern Implementation ===");

        // Create the factories (creators)
        DocumentFactory wordFactory = new WordDocumentFactory();
        DocumentFactory pdfFactory = new PdfDocumentFactory();
        DocumentFactory excelFactory = new ExcelDocumentFactory();

        // 1. Create and test Word Document
        System.out.println("\n--- Word Document Lifecycle via Factory ---");
        Document wordDoc = wordFactory.createDocument();
        wordDoc.open();
        
        // Test type-specific method if applicable
        if (wordDoc instanceof WordDocument) {
            ((WordDocument) wordDoc).edit();
        }
        wordDoc.save();
        wordDoc.close();

        // 2. Create and test PDF Document
        System.out.println("\n--- PDF Document Lifecycle via Factory ---");
        Document pdfDoc = pdfFactory.createDocument();
        pdfDoc.open();
        
        // Test type-specific method if applicable
        if (pdfDoc instanceof PdfDocument) {
            ((PdfDocument) pdfDoc).print();
        }
        pdfDoc.save();
        pdfDoc.close();

        // 3. Create and test Excel Document
        System.out.println("\n--- Excel Document Lifecycle via Factory ---");
        Document excelDoc = excelFactory.createDocument();
        excelDoc.open();
        
        // Test type-specific method if applicable
        if (excelDoc instanceof ExcelDocument) {
            ((ExcelDocument) excelDoc).calculate();
        }
        excelDoc.save();
        excelDoc.close();
    }
}
