import org.junit.Test;
import static org.junit.Assert.*;

public class CalculatorTest {

    Calculator calculator = new Calculator();

    @Test
    public void testAdd() {
        assertEquals(30, calculator.add(10, 20));
    }

    @Test
    public void testSubtract() {
        assertEquals(10, calculator.subtract(20, 10));
    }

    @Test
    public void testMultiply() {
        assertEquals(48, calculator.multiply(6, 8));
    }

    @Test
    public void testDivide() {
        assertEquals(5, calculator.divide(10, 2));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testDivideByZero() {
        calculator.divide(10, 0);
    }
}