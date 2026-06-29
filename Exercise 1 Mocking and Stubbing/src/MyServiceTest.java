import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class MyServiceTest {
    @Test
    public void testExternalApi() {
        // 1. Create a mock object for the external API
        ExternalApi mockApi = Mockito.mock(ExternalApi.class);
        
        // 2. Stub the methods to return predefined values
        when(mockApi.getData()).thenReturn("Mock Data");
        
        // 3. Write a test case that uses the mock object
        MyService service = new MyService(mockApi);
        String result = service.fetchData();
        
        // Verify the result
        assertEquals("Mock Data", result);
    }
}
