public class ConcreteExcelDocument implements ExcelDocument {
    @Override
    public void open() {
        System.out.println("Opening Excel document...");
    }

    @Override
    public void save() {
        System.out.println("Saving Excel document...");
    }

    @Override
    public void close() {
        System.out.println("Closing Excel document...");
    }

    @Override
    public void calculate() {
        System.out.println("Calculating formulas in Excel sheet.");
    }

    public static void main(String[] args) {
        DocumentTest.main(args);
    }
}
