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
           "productId": component.get("v.productDetails.Id"),
           "quantity": component.get("v.quantity")
       })
       action.setCallback(this, function(response) {
            this.showToast(component);
       });
       $A.enqueueAction(action);
    },
    getOverallRating: function(component, id) {
       var action = component.get("c.getOverallRating");
       action.setParams({
           "productId": id
       })
       action.setCallback(this, function(response) {
            component.set("v.overallRating", response.getReturnValue())
       });
       $A.enqueueAction(action);
    },
   showToast : function(component) {
       var toastEvent = $A.get("e.force:showToast");
       toastEvent.setParams({
           "title": $A.get("$Label.c.Success"),
           "message": $A.get("$Label.c.Added_to_Cart"),
           "type": "success"
       });
       toastEvent.fire();
   }
})