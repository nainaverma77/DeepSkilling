import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertNotNull;

/**
 * AssertionsTest verifies various JUnit assertions as required by Exercise 3.
 */
public class AssertionsTest {

    @Test
    public void testAssertions() {
        // Assert equals: verifies that two values are equal
        assertEquals(5, 2 + 3);
        System.out.println("Assertion Passed: assertEquals(5, 2 + 3)");

        // Assert true: verifies that a condition is true
        assertTrue(5 > 3);
        System.out.println("Assertion Passed: assertTrue(5 > 3)");

        // Assert false: verifies that a condition is false
        assertFalse(5 < 3);
        System.out.println("Assertion Passed: assertFalse(5 < 3)");

        // Assert null: verifies that an object reference is null
        assertNull(null);
        System.out.println("Assertion Passed: assertNull(null)");

        // Assert not null: verifies that an object reference is not null
        assertNotNull(new Object());
        System.out.println("Assertion Passed: assertNotNull(new Object())");
    }
}
