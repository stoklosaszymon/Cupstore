({
    isInWishlist: function(component, productId) {
        var action = component.get("c.isInWishlist");
        action.setParams({
            "productId": component.get("v.productId")
        });
        action.setCallback(this, function(response){
            console.log("is in wishlist", response.getReturnValue());
             component.set("v.isInWishlist", response.getReturnValue())
        });
        $A.enqueueAction(action);
    },
    addToWishlist: function(component) {
        console.log('asd');
        var action = component.get("c.addToWishlist");
        action.setParams({
            "productId": component.get("v.productId")
        });
        action.setCallback(this, function(response){
            console.log("added");
        });
        $A.enqueueAction(action);
    }
})