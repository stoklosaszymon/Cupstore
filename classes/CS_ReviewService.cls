public with sharing class CS_ReviewService {

    public static void addReview(String text, String productId, Integer rating) {
        ProductReview__c review = new ProductReview__c();
        review.Cup__c = productId;
        review.Body__c = text;
        review.Rating__c = rating;
        review.Created_At__c = Datetime.now();
        review.User__c = UserInfo.getUserId();
        insert review;
    }

    public static List<ProductReview__c> getThreeReviews(String productId, Integer page) {
        Integer offset = (page * 3) - 3;
        return [
                SELECT Id, Body__c, Created_At__c, Rating__c, User__r.Name
                FROM ProductReview__c
                WHERE Cup__c = :productId
                ORDER BY Created_At__c DESC
                LIMIT 3
                OFFSET :offset
        ];
    }

    public static Integer getCommentsCount(String productId) {
        return [
                SELECT COUNT()
                FROM ProductReview__c
                WHERE Cup__c = :productId
        ];
    }
}