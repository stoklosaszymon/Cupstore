({
    isInWishlist: function(component, productId) {
        let action = component.get("c.isInWishlist");
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
        let action = component.get("c.addToWishlist");
        action.setParams({
            "productId": component.get("v.productId")
        });
        action.setCallback(this, function(response){
          let state = response.getState();
          if (state == 'SUCCESS') {
              this.handleMessage(
                  $A.get("$Label.c.Success"),
                  $A.get("$Label.c.Added_to_Wishlist"),
                  "success"
              );
          }
        });
        $A.enqueueAction(action);
    },

    removeFromWishlist: function(component) {
        let action = component.get("c.removeFromWishlist");
        action.setParams({
            "id": component.get("v.productId")
        });
        action.setCallback(this, function(response){
          let state = response.getState();
          if (state == 'SUCCESS') {
              this.handleMessage(
                  $A.get("$Label.c.Success"),
                  $A.get("$Label.c.Removed_From_Wishlist"),
                  "success"
              );
          }
        });
        $A.enqueueAction(action);
    },
})