public interface PdfDocument extends Document {
    // Custom method specific to PDF documents if needed
    void print();

    static void main(String[] args) {
        DocumentTest.main(args);
    }
}
