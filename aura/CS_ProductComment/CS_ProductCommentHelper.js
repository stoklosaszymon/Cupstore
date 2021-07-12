({
    getReviews: function(component) {
      var action = component.get("c.getReviews");
             action.setParams({
                 "productId": component.get("v.productId")
             });
             action.setCallback(this, function(response) {
                 component.set("v.reviews", response.getReturnValue())
            });
            $A.enqueueAction(action);
    }
})