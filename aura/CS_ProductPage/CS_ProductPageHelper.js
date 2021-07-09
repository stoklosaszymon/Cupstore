({
    getProduct: function(component, id) {
      var action = component.get("c.getProduct");
      action.setParams({ "id": id});
      action.setCallback(this, function(response) {
          component.set("v.productDetails", response.getReturnValue());
      });
      $A.enqueueAction(action);
    },
})