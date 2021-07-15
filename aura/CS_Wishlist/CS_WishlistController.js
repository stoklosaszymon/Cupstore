({
    onInit: function(component, event, helper) {
        helper.getWishlist(component);
    },
    onRemove: function(component, event, helper) {
       var id = event.currentTarget.dataset.id;
       helper.removeFromWishlist(component, id);
    },
    onRedirect: function(component, event, helper) {
        var id = event.currentTarget.dataset.id;
        var event = $A.get("e.c:CS_SelectProduct");
        helper.goToProduct(component, id);
    }
})