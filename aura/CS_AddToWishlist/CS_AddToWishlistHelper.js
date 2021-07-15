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
            this.showToast(component);
        });
        $A.enqueueAction(action);
    },
   showToast : function(component) {
       var toastEvent = $A.get("e.force:showToast");
       toastEvent.setParams({
           "title": $A.get("$Label.c.Success"),
           "message": $A.get("$Label.c.Added_to_Wishlist"),
           "type": "success"
       });
       toastEvent.fire();
   }
})