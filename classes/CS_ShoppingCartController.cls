public with sharing class CS_ShoppingCartController {
    @AuraEnabled
    public static List<ShoppingCart__c> getCartProducts() {
       return CS_ShoppingCartService.getCartProducts();
    }

    @AuraEnabled
    public static Decimal getOverallSum() {
        return CS_ShoppingCartService.getOverallSum();
    }

    @AuraEnabled
    public static void removeFromCart(String productId) {
       CS_ShoppingCartService.removeFromCart(productId);
    }

    @AuraEnabled
    public static Decimal increaseQuantity(String id) {
       return CS_ShoppingCartService.increaseQuantity(id);
    }

    @AuraEnabled
    public static Decimal decreaseQuantity(String id) {
       return CS_ShoppingCartService.decreaseQuantity(id);
    }

    @AuraEnabled
    public static Boolean selectProduct(String id) {
       return CS_ShoppingCartService.selectProduct(id);
    }
}