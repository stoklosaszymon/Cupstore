public with sharing class CS_ProductService {

    public static List<Cup__c> getProducts() {
        return [SELECT Name, Price__c, Quantity__c FROM Cup__c];
    }

    public static List<Cup__c> searchProduct(String query) {
        query += '%';
        return [
                SELECT Name, Price__c, Quantity__c
                FROM Cup__c
                WHERE Name LIKE :query
        ];
    }

    public static Cup__c getProduct(String id) {
        return [
                SELECT Name, Price__c, Quantity__c, Colors__c, Description__c, Material__c, Volume__c
                FROM Cup__c
                WHERE Id = :id
        ];
    }

    public static List<String> getProductAttachments(String id) {
        List<String> images = new List<String>();
        List<Attachment> attachments = [
                SELECT Body
                FROM Attachment
                WHERE ParentId = :id
        ];
        for (Attachment attachment : attachments) {
            images.add(
                    attachment.Body.toString()
            );
        }
        return images;
    }

    public static void addToCart(String productId, Integer quantity) {
        ShoppingCart__c shoppingCart = new ShoppingCart__c();
        shoppingCart.Cup__c = productId;
        shoppingCart.User__c = UserInfo.getUserId();
        shoppingCart.Quantity__c = 1;
        shoppingCart.Quantity__c = quantity;
        insert shoppingCart;
    }

    public static Decimal getOverallRating(String productId) {
        AggregateResult reviews = [
                SELECT AVG(Rating__c) rating
                FROM ProductReview__c
                WHERE Cup__c = :productId
        ];
        return (Decimal) reviews.get('rating');
    }
}