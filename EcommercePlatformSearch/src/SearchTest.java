import java.util.Arrays;

public class SearchTest {
    public static void main(String[] args) {
        // --- 1. Small Sample Set Setup ---
        System.out.println("=== 1. Initializing Sample Product Catalog ===");
        Product[] products = {
            new Product("P101", "Laptop", "Electronics"),
            new Product("P202", "Smartphone", "Electronics"),
            new Product("P303", "Running Shoes", "Apparel"),
            new Product("P404", "Coffee Maker", "Home Appliances"),
            new Product("P505", "Backpack", "Accessories"),
            new Product("P606", "Desk Chair", "Furniture")
        };

        System.out.println("Initial Unsorted Catalog:");
        printCatalog(products);

        // --- 2. Linear Search Demonstration ---
        System.out.println("\n=== 2. Linear Search Test ===");
        String target1 = "Coffee Maker";
        System.out.println("Searching for \"" + target1 + "\" using Linear Search...");
        Product found1 = SearchAlgorithms.linearSearch(products, target1);
        System.out.println("Result: " + (found1 != null ? found1 : "Not Found"));

        String target2 = "Tablet";
        System.out.println("Searching for \"" + target2 + "\" using Linear Search...");
        Product found2 = SearchAlgorithms.linearSearch(products, target2);
        System.out.println("Result: " + (found2 != null ? found2 : "Not Found"));

        // --- 3. Sorting for Binary Search ---
        System.out.println("\n=== 3. Sorting Catalog by Product Name (Required for Binary Search) ===");
        Arrays.sort(products);
        System.out.println("Sorted Catalog:");
        printCatalog(products);

        // --- 4. Binary Search Demonstration ---
        System.out.println("\n=== 4. Binary Search Test ===");
        System.out.println("Searching for \"" + target1 + "\" using Binary Search...");
        Product found3 = SearchAlgorithms.binarySearch(products, target1);
        System.out.println("Result: " + (found3 != null ? found3 : "Not Found"));

        System.out.println("Searching for \"" + target2 + "\" using Binary Search...");
        Product found4 = SearchAlgorithms.binarySearch(products, target2);
        System.out.println("Result: " + (found4 != null ? found4 : "Not Found"));


        // --- 5. Benchmarking with Large Dataset ---
        runLargeBenchmark();
    }

    private static void printCatalog(Product[] products) {
        for (Product p : products) {
            System.out.println("  " + p);
        }
    }

    private static void runLargeBenchmark() {
        int size = 100000;
        System.out.println("\n=== 5. Performance Benchmarking (Dataset Size: " + size + " Products) ===");
        
        // Generate a large database of products
        Product[] largeCatalog = new Product[size];
        for (int i = 0; i < size; i++) {
            String id = "P" + String.format("%06d", i);
            String name = "Product_" + String.format("%06d", i);
            String category = "Category_" + (i % 10);
            largeCatalog[i] = new Product(id, name, category);
        }
        
        // Ensure catalog is sorted for Binary Search
        Arrays.sort(largeCatalog);

        String[] benchmarkTargets = {
            "Product_000005",   // Near start (Very fast for linear search if it searches sequentially)
            "Product_050000",   // In the exact middle
            "Product_099995",   // Near the end (Worst case for linear search)
            "Product_NonExistent" // Not present (Worst case for both)
        };

        // JVM Warmup runs
        for (String target : benchmarkTargets) {
            for (int i = 0; i < 500; i++) {
                SearchAlgorithms.linearSearch(largeCatalog, target);
                SearchAlgorithms.binarySearch(largeCatalog, target);
            }
        }

        int runs = 1000;
        for (String target : benchmarkTargets) {
            System.out.println("\nTarget: " + target);

            // Benchmark Linear Search
            long startLinear = System.nanoTime();
            for (int r = 0; r < runs; r++) {
                SearchAlgorithms.linearSearch(largeCatalog, target);
            }
            long endLinear = System.nanoTime();
            long linearDuration = (endLinear - startLinear) / runs;

            // Benchmark Binary Search
            long startBinary = System.nanoTime();
            for (int r = 0; r < runs; r++) {
                SearchAlgorithms.binarySearch(largeCatalog, target);
            }
            long endBinary = System.nanoTime();
            long binaryDuration = (endBinary - startBinary) / runs;

            System.out.printf("  Linear Search Average Time : %,9d ns\n", linearDuration);
            System.out.printf("  Binary Search Average Time : %,9d ns\n", binaryDuration);
            if (binaryDuration > 0) {
                System.out.printf("  Speedup                    : %,9.2fx faster\n", (double) linearDuration / binaryDuration);
            } else {
                System.out.println("  Speedup                    : N/A (Binary search took < 1ns)");
            }
        }
    }
}
