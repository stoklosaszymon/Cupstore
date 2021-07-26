({
    addProduct: function(component) {
        let action = component.get("c.addProduct");
        component.set("v.loading", true);
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
                  $A.get("$Label.c.Add_New_Product"),
                  "success"
              );
              component.set("v.loading", false);
          } else {
              this.handleMessage(
                  $A.get("$Label.c.Error"),
                  $A.get("$Label.c.Error_Add_Product"),
                  "error"
              );
          }
       });
       $A.enqueueAction(action);
    },

    getUserProducts: function(component) {
        let action = component.get("c.getUserProducts");
        action.setCallback(this, function(response) {
           let state = response.getState();
           if (state == 'SUCCESS') {
                component.set("v.products", response.getReturnValue());
           }
        });
        $A.enqueueAction(action);
    },

    processFiles: function(component, event) {
      let image = component.get("v.images");
      var images = JSON.parse(JSON.stringify(image));
      var files = event.getSource().get("v.files");
      [ ...files].forEach( (file) => {
             var reader = new FileReader();
             reader.readAsDataURL(file);
             reader.onloadend = function () {
               var base64String = reader.result.split(',').pop();
               images.push(base64String);
               component.set("v.images", images);
          }
      });
    }
})