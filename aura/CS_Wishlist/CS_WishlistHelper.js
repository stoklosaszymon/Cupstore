({
    getWishlist: function(component) {
        var action = component.get("c.getWishlist");
        action.setCallback(this, function(response) {
            console.log(response.getReturnValue());
            component.set("v.wishlist", response.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})