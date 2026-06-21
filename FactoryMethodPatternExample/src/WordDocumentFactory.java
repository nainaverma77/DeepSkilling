public class WordDocumentFactory extends DocumentFactory {
    @Override
    public Document createDocument() {
        return new ConcreteWordDocument();
    }

    public static void main(String[] args) {
        DocumentTest.main(args);
    }
}
