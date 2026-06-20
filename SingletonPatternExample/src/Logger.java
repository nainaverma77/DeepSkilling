public class Logger {
    // Private constructor to prevent instantiation from outside the class
    private Logger() {
        System.out.println("Logger instance created.");
    }

    // Static helper class (holder) that is loaded only when getInstance() is called
    private static class LoggerHolder {
        private static final Logger INSTANCE = new Logger();
    }

    // Public static method to provide a global access point to the instance
    // Thread-safe and lazy-loaded without requiring synchronized blocks
    public static Logger getInstance() {
        return LoggerHolder.INSTANCE;
    }

    // A simple method to demonstrate logging functionality
    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}
