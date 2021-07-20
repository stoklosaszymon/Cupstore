({
    getProduct: function(component) {
      let id = component.get("v.recordId");
      let action = component.get("c.getProduct");
      action.setParams({ "id": id});
      action.setCallback(this, function(response) {
          let state = response.getState();
          if (state == 'SUCCESS') {
              component.set("v.productDetails", response.getReturnValue());
          } else {
              this.handleMessage(
                  $A.get("$Label.c.Error"),
                  $A.get("$Label.c.Error_Get_Product"),
                  "error"
              );
          }
      });
      $A.enqueueAction(action);
    },

    addToShoppingCart: function(component) {
       let action = component.get("c.addToCart");
       action.setParams({
           "productId": component.get("v.recordId"),
           "quantity": component.get("v.quantity")
       })
       action.setCallback(this, function(response) {
          let state = response.getState();
          if (state == 'SUCCESS') {
              this.handleMessage(
                  $A.get("$Label.c.Success"),
                  $A.get("$Label.c.Added_to_cart"),
                  "success"
              );
          } else {
              this.handleMessage(
                  $A.get("$Label.c.Error"),
                  $A.get("$Label.c.Error_Add_To_Cart"),
                  "error"
              );
          }
       });
       $A.enqueueAction(action);
    },

    getOverallRating: function(component) {
       let id = component.get("v.recordId");
       let action = component.get("c.getOverallRating");
       action.setParams({
           "productId": id
       })
       action.setCallback(this, function(response) {
          let state = response.getState();
          if (state == 'SUCCESS') {
              component.set("v.overallRating", response.getReturnValue())
          } else {
              this.handleMessage(
                  $A.get("$Label.c.Error"),
                  $A.get("$Label.c.Error_Get_Rating"),
                  "error"
              );
          }
       });
       $A.enqueueAction(action);
    },

    increaseQuantity: function(component) {
        let quantity = component.get("v.quantity");
        component.set("v.quantity", quantity + 1);
    },

    decreaseQuantity: function(component) {
       let quantity = component.get("v.quantity");
       if (quantity > 1) {
        component.set("v.quantity", quantity - 1);
       }
    },
})