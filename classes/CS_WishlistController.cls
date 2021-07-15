
public with sharing class CS_WishlistController {

    @AuraEnabled
    public static void addToWishlist(String productId) {
        CS_WishlistService.addToWishlist(productId);
    }

    @AuraEnabled
    public static Boolean isInWishlist(String productId) {
       return CS_WishlistService.isInWishlist(productId);
    }

    @AuraEnabled
    public static List<Wishlist__c> getWishlist() {
        return CS_WishlistService.getWishlist();
    }
}