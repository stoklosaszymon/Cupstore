({
    onInit: function(component, event, helper) {
        helper.isInWishlist(component);
    },

    onAddToWishlist: function(component, event, helper) {
       helper.addToWishlist(component);
       helper.isInWishlist(component);
    },

    onRemoveFromWishlist: function(component, event, helper) {
       helper.removeFromWishlist(component);
       helper.isInWishlist(component);
    }
})