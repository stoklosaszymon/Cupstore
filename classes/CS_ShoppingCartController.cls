public with sharing class CS_ShoppingCartController {
    @AuraEnabled
    public static List<ShoppingCart__c> getCartProducts() {
        String userId = UserInfo.getUserId();
        return [
                SELECT
                        Cup__r.Name, Cup__r.Price__c, Quantity__c
                FROM ShoppingCart__c
                WHERE User__c = :userId
        ];
    }

    @AuraEnabled
    public static Decimal getOverallSum() {
        String userId = UserInfo.getUserId();
        AggregateResult result = [
                SELECT SUM(Cup__r.Price__c) overallSum
                FROM ShoppingCart__c
                WHERE User__c = :userId
        ];

        return (Decimal) result.get('overallSum');
    }

    @AuraEnabled
    public static void removeFromCart(String productId) {
        String userId = UserInfo.getUserId();
        ShoppingCart__c shoppingCart = [
                SELECT Id
                FROM ShoppingCart__c
                WHERE Id = :productId
                AND User__c = :userId
        ];

        delete shoppingCart;
    }
}