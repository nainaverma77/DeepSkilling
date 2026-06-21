public class PdfDocumentFactory extends DocumentFactory {
    @Override
    public Document createDocument() {
        return new ConcretePdfDocument();
    }

    public static void main(String[] args) {
        DocumentTest.main(args);
    }
}
