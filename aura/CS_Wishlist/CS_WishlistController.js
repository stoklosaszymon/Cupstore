({
    onInit: function(component, event, helper) {
        helper.getWishlist(component);
    },
    onRemove: function(component, event, helper) {
       let id = event.currentTarget.dataset.id;
       helper.removeFromWishlist(component, id);
    },
    onRedirect: function(component, event, helper) {
       helper.goToProduct(component, event);
    }
})