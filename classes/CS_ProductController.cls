public with sharing class CS_ProductController {
    @AuraEnabled
    public static List<Cup__c> getProducts() {
        return CS_ProductService.getProducts();
    }

    @AuraEnabled
    public static List<Cup__c> searchProduct(String query) {
        return CS_ProductService.searchProduct(query);
    }

    @AuraEnabled
    public static Cup__c getProduct(String id) {
       return CS_ProductService.getProduct(id);
    }

    @AuraEnabled
    public static List<String> getProductAttachments(String id) {
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
}