public with sharing class CS_ReviewController {

    @AuraEnabled
    public static void addReview(String text, String productId) {
        ProductReview__c review = new ProductReview__c();
        review.Cup__c = productId;
        review.Body__c = text;
        review.Created_At__c = Datetime.now();
        review.User__c = UserInfo.getUserId();
        insert review;
    }

    @AuraEnabled
    public static List<ProductReview__c> getReviews(String productId) {
        return [
                SELECT Id, Body__c, Created_At__c, User__r.Name
                FROM ProductReview__c
                WHERE Cup__c = :productId
                ORDER BY Created_At__c DESC
        ];
    }
}