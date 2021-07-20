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

    public static CS_ProductWrapper getProduct(String id) {
        Cup__c cup = [
                SELECT Name, Price__c, Quantity__c, Colors__c, Description__c, Material__c, Volume__c, Short_Description__c
                FROM Cup__c
                WHERE Id = :id
        ];
        return parseToWrapper(cup);
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
        shoppingCart.Quantity__c = quantity;
        shoppingCart.Selected__c = true;
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

    private static List<CS_ProductWrapper> parseToWrapperList(List<Cup__c> cups) {
        List<CS_ProductWrapper> wrapper = new List<CS_ProductWrapper>();
        for (Cup__c cup : cups) {
            wrapper.add(
                    parseToWrapper(cup)
            );
        }
        return wrapper;
    }

    private static CS_ProductWrapper parseToWrapper(Cup__c cup) {
        CS_ProductWrapper wrapper = new CS_ProductWrapper(
                cup.Id,
                cup.Name,
                cup.Price__c,
                cup.Colors__c,
                cup.Description__c,
                cup.Short_Description__c,
                cup.Material__c,
                cup.Volume__c
        );
        return wrapper;
    }
}