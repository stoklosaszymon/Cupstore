public with sharing class CS_WishlistService {

    public static void addToWishlist(String productId) {
        String userId = UserInfo.getUserId();
        Wishlist__c wishlist = new Wishlist__c();
        wishlist.User__c = userId;
        wishlist.Cup__c = productId;
        insert wishlist;
    }

    public static Boolean isInWishlist(String productId) {
        String userId = UserInfo.getUserId();
        List<Wishlist__c> wishlist = [
                SELECT Id
                FROM Wishlist__c
                WHERE Cup__c = :productId
                AND User__c = :userId
        ];

        if (wishlist.size() > 0) {
            return true;
        }
        return false;
    }

    public static List<Wishlist__c> getWishlist() {
        String userId = UserInfo.getUserId();
        List<Wishlist__c> wishlist = [
                SELECT Id, Cup__r.Name, Cup__R.Price__c, Cup__r.Description__c
                FROM Wishlist__c
                WHERE User__c = :userId
        ];
        return wishlist;
    }

    public static void removeFromWishlist(String id) {
        String userId = UserInfo.getUserId();
        List<Wishlist__c> wishlist = [
                SELECT Id
                FROM Wishlist__c
                WHERE User__c = :userId
                AND (Id = :id OR Cup__c =: id)
        ];
        delete wishlist;
    }
}