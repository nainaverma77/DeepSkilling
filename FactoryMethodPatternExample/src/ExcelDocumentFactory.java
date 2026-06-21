public class ExcelDocumentFactory extends DocumentFactory {
    @Override
    public Document createDocument() {
        return new ConcreteExcelDocument();
    }

    public static void main(String[] args) {
        DocumentTest.main(args);
    }
}
