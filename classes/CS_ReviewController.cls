public with sharing class CS_ReviewController {

    @AuraEnabled
    public static void addReview(String text, String productId, Integer rating) {
       CS_ReviewService.addReview(text, productId, rating);
    }

    @AuraEnabled
    public static List<CS_ReviewWrapper> getThreeReviews(String productId, Integer page) {
       return CS_ReviewService.getThreeReviews(productId, page);
    }

    @AuraEnabled
    public static Integer getCommentsCount(String productId) {
       return CS_ReviewService.getCommentsCount(productId);
    }
}