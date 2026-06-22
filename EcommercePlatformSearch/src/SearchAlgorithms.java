public class SearchAlgorithms {

    /**
     * Searches for a product by name using Linear Search.
     * Time Complexity: O(N)
     * Space Complexity: O(1)
     *
     * @param products   Array of products (can be unsorted)
     * @param targetName Name of the product to search for
     * @return Product if found, null otherwise
     */
    public static Product linearSearch(Product[] products, String targetName) {
        if (products == null || targetName == null) {
            return null;
        }
        for (Product product : products) {
            if (product != null && product.getProductName().equalsIgnoreCase(targetName)) {
                return product;
            }
        }
        return null;
    }

    /**
     * Searches for a product by name using Binary Search.
     * Assumes the array is sorted alphabetically by productName.
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     *
     * @param products   Sorted array of products (alphabetically by productName)
     * @param targetName Name of the product to search for
     * @return Product if found, null otherwise
     */
    public static Product binarySearch(Product[] products, String targetName) {
        if (products == null || targetName == null) {
            return null;
        }
        int left = 0;
        int right = products.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            Product midProduct = products[mid];

            if (midProduct == null) {
                return null;
            }

            int comparison = midProduct.getProductName().compareToIgnoreCase(targetName);

            if (comparison == 0) {
                return midProduct;
            } else if (comparison < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return null;
    }
}
