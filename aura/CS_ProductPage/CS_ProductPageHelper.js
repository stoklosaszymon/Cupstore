({
    getProduct: function(component, id) {
      var action = component.get("c.getProduct");
      action.setParams({ "id": id});
      action.setCallback(this, function(response) {
          component.set("v.productDetails", response.getReturnValue());
      });
      $A.enqueueAction(action);
    },
    addToShoppingCart: function(component) {
       var action = component.get("c.addToCart");
       action.setParams({
           "productId": component.get("v.productDetails.Id")
       })
       action.setCallback(this, function(response) {

       });
       $A.enqueueAction(action);
    }
})