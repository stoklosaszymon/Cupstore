({
   createOrder: function(component) {
      let action = component.get("c.createOrder");
      action.setParams({
          "firstName": component.get("v.firstName"),
          "lastName": component.get("v.lastName"),
          "email": component.get("v.email"),
          "city": component.get("v.city"),
          "country": component.get("v.country"),
          "street": component.get("v.street"),
          "phone": component.get("v.phone"),
          "postalCode": component.get("v.postalCode")
      });
      action.setCallback(this, function(response) {
          let state = response.getState();
          if (state == 'SUCCESS') {
              this.handleMessage(
                  $A.get("$Label.c.Success"),
                  "Order created",
                  "success"
              );
          } else {
              this.handleMessage(
                  $A.get("$Label.c.Error"),
                  "Order created",
                  "error"
              );
          }
      });
      $A.enqueueAction(action);
   },
    getCartProducts: function(component) {
        var action = component.get("c.getCartProducts");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                console.log(response.getReturnValue())
                component.set("v.shoppingCart", response.getReturnValue());
                this.getOverallSum(component);
            }
        });
        $A.enqueueAction(action);
    },

})