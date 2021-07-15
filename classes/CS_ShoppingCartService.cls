public with sharing class CS_ShoppingCartService {

    public static List<ShoppingCart__c> getCartProducts() {
        String userId = UserInfo.getUserId();
        return [
                SELECT Cup__r.Name, Cup__r.Price__c, Quantity__c, Id, Selected__c
                FROM ShoppingCart__c
                WHERE User__c = :userId
        ];
    }

    public static Decimal getOverallSum() {
        String userId = UserInfo.getUserId();
        AggregateResult result = [
                SELECT SUM(Price__c) overallSum
                FROM ShoppingCart__c
                WHERE User__c = :userId
                AND Selected__c = true
        ];

        return (Decimal) result.get('overallSum');
    }

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

    public static Decimal increaseQuantity(String id) {
        String userId = UserInfo.getUserId();
        ShoppingCart__c shoppingCart = [
                SELECT Id, Quantity__c
                FROM ShoppingCart__c
                WHERE Id = :id
                AND User__c = :userId
        ];

        shoppingCart.Quantity__c += 1;
        update shoppingCart;
        return shoppingCart.Quantity__c;
    }

    public static Decimal decreaseQuantity(String id) {
        String userId = UserInfo.getUserId();
        ShoppingCart__c shoppingCart = [
                SELECT Id, Quantity__c
                FROM ShoppingCart__c
                WHERE Id = :id
                AND User__c = :userId
        ];

        if (shoppingCart.Quantity__c > 0) {
            shoppingCart.Quantity__c -= 1;
        }
        update shoppingCart;
        return shoppingCart.Quantity__c;
    }

    public static Boolean selectProduct(String id) {
        String userId = UserInfo.getUserId();
        ShoppingCart__c cart = [
                SELECT Selected__c
                FROM ShoppingCart__c
                WHERE Id = :id
                AND User__c = :userId
        ];
        cart.Selected__c = !cart.Selected__c;
        update cart;
        return cart.Selected__c;
    }
}