public interface ExcelDocument extends Document {
    // Custom method specific to Excel documents if needed
    void calculate();

    static void main(String[] args) {
        DocumentTest.main(args);
    }
}
