public with sharing class CS_WishlistService {

    public static void addToWishlist(String productId) {
        String userId = UserInfo.getUserId();
        Wishlist__c wishlist = new Wishlist__c();
        wishlist.User__c = userId;
        wishlist.Product__c = productId;
        insert wishlist;
    }

    public static Boolean isInWishlist(String productId) {
        String userId = UserInfo.getUserId();
        List<Wishlist__c> wishlist = [
                SELECT Id
                FROM Wishlist__c
                WHERE Product__c = :productId
                AND User__c = :userId
        ];

        if (wishlist.size() > 0) {
            return true;
        }
        return false;
    }

    public static List<CS_ProductListWrapper> getWishlist() {

        String userId = UserInfo.getUserId();
        List<Wishlist__c> wishlist = [
                SELECT Product__r.Name, Product__r.Id
                FROM Wishlist__c
                WHERE User__c = :userId
        ];

        List<CS_ProductListWrapper> wrapperList = new List<CS_ProductListWrapper>();
        for (Wishlist__c wishlistElement: wishlist) {
            CS_ProductListWrapper wrapper = new CS_ProductListWrapper(
                    wishlistElement.Product__r.Id,
                    wishlistElement.Product__r.Name,
                    CS_ProductService.getProductPrice(wishlistElement.Product__r.Id)
            );
            wrapperList.add(wrapper);
        }
        return wrapperList;
    }

    public static void removeFromWishlist(String id) {
        String userId = UserInfo.getUserId();
        List<Wishlist__c> wishlist = [
                SELECT Id
                FROM Wishlist__c
                WHERE User__c = :userId
                AND (Id = :id OR Product__c = :id)
        ];
        delete wishlist;
    }
}