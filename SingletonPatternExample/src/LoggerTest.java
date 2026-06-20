public class LoggerTest {
    public static void main(String[] args) {
        System.out.println("=== Testing Singleton Pattern Implementation ===");

        // Get instance 1
        System.out.println("Requesting Logger instance 1...");
        Logger logger1 = Logger.getInstance();

        // Get instance 2
        System.out.println("Requesting Logger instance 2...");
        Logger logger2 = Logger.getInstance();

        // Verify that only one instance was created
        System.out.println("Logger 1 reference: " + logger1);
        System.out.println("Logger 2 reference: " + logger2);

        // Perform logging operations
        logger1.log("Message from logger1 reference");
        logger2.log("Message from logger2 reference");

        // Reference check
        if (logger1 == logger2) {
            System.out.println("\nSUCCESS: Both logger1 and logger2 references point to the same instance!");
        } else {
            System.out.println("\nFAILURE: logger1 and logger2 references point to different instances.");
        }
    }
}
