import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import static org.junit.Assert.*;

public class CalculatorTest {

    private Calculator calculator;

    @Before
    public void setUp() {
        System.out.println("[SETUP] Initializing Calculator instance before test...");
        calculator = new Calculator();
    }

    @After
    public void tearDown() {
        System.out.println("[TEARDOWN] Cleaning up Calculator instance after test...\n");
        calculator = null;
    }

    @Test
    public void testAdd() {
        System.out.println("[TEST] Running testAdd...");
        // Arrange
        int a = 10;
        int b = 20;

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(30, result);
        System.out.println("  Verified: " + a + " + " + b + " = " + result);
    }

    @Test
    public void testSubtract() {
        System.out.println("[TEST] Running testSubtract...");
        // Arrange
        int a = 50;
        int b = 15;

        // Act
        int result = calculator.subtract(a, b);

        // Assert
        assertEquals(35, result);
        System.out.println("  Verified: " + a + " - " + b + " = " + result);
    }

    @Test
    public void testMultiply() {
        System.out.println("[TEST] Running testMultiply...");
        // Arrange
        int a = 6;
        int b = 8;

        // Act
        int result = calculator.multiply(a, b);

        // Assert
        assertEquals(48, result);
        System.out.println("  Verified: " + a + " * " + b + " = " + result);
    }

    @Test
    public void testDivide() {
        System.out.println("[TEST] Running testDivide...");
        // Arrange
        int a = 100;
        int b = 5;

        // Act
        int result = calculator.divide(a, b);

        // Assert
        assertEquals(20, result);
        System.out.println("  Verified: " + a + " / " + b + " = " + result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testDivideByZero() {
        System.out.println("[TEST] Running testDivideByZero (expecting exception)...");
        // Arrange
        int a = 10;
        int b = 0;

        // Act & Assert
        calculator.divide(a, b);
    }
}