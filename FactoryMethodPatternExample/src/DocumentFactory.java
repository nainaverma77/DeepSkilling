public abstract class DocumentFactory {
    // Abstract Factory Method that concrete creators will implement
    public abstract Document createDocument();

    // A helper method demonstrating that the creator class often contains some
    // business logic that relies on the product object, returned by the factory method.
    public void openDocument() {
        Document doc = createDocument();
        doc.open();
    }

    public static void main(String[] args) {
        DocumentTest.main(args);
    }
}
