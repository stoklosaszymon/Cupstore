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
    public static List<CS_ProductListWrapper> getWishlist() {
        return CS_WishlistService.getWishlist();
    }

    @AuraEnabled
    public static void removeFromWishlist(String id) {
        CS_WishlistService.removeFromWishlist(id);
    }
}