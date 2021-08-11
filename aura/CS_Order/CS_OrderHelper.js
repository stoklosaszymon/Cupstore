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
              this.goToHome(component);
          } else {
              this.handleErrors(
                  response.getError()
              );
          }
      });
      $A.enqueueAction(action);
   },

    getCartProducts: function(component) {
        let action = component.get("c.getCartProducts");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                component.set("v.shoppingCart", response.getReturnValue());
                this.getOverallSum(component);
            }
        });
        $A.enqueueAction(action);
    },

    goToHome: function(component) {
        let pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        };

        let navService = component.find("navService");
        navService.navigate(pageReference);
    },

    getOverallSum: function(component) {
        let products = component.get("v.shoppingCart");
        let prices = products.map( (product) => product.price * product.quantity);
        component.set("v.overall", prices.reduce( (acc, p) => acc + p));
    }
})