({
    addProduct: function(component) {
        let action = component.get("c.addProduct");
        action.setParams({
            "name": component.get("v.productName"),
            "shortDescription": component.get("v.shortDescription"),
            "description": component.get("v.description"),
            "colors": component.get("v.colors"),
            "material": component.get("v.material"),
            "volume": component.get("v.volume"),
            "price": component.get("v.price"),
            "images": component.get("v.images")
        });
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
    }
})