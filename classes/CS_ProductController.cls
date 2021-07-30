public with sharing class CS_ProductController {
    @AuraEnabled
    public static List<PricebookEntry> getProducts() {
        return CS_ProductService.getProducts();
    }

    @AuraEnabled
    public static List<CS_ProductListWrapper> searchProduct(String query) {
        return CS_ProductService.searchProduct(query);
    }

    @AuraEnabled
    public static CS_ProductWrapper getProduct(String id) {
        return CS_ProductService.getProduct(id);
    }

    @AuraEnabled
    public static List<Attachment> getProductAttachments(String id) {
        return CS_ProductService.getProductAttachments(id);
    }

    @AuraEnabled
    public static void addToCart(String productId, Integer quantity) {
        CS_ProductService.addToCart(productId, quantity);
    }

    @AuraEnabled
    public static Decimal getOverallRating(String productId) {
        return CS_ProductService.getOverallRating(productId);
    }

    @AuraEnabled
    public static void addProduct(String name, String description, Decimal price, String[] images) {
        CS_ProductService.addProduct(name, description, price, images);
    }

    @AuraEnabled
    public static List<Product2> getUserProducts() {
        return CS_ProductService.getUserProducts();
    }

    @AuraEnabled
    public static Decimal getProductPrice(String id) {
        return CS_ProductService.getProductPrice(id);
    }
}