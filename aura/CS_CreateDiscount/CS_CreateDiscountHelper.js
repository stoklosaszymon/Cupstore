({
    addDiscount: function(component) {
        console.log({
                    "title": component.get("v.title"),
                    "startDate": component.get("v.startDate"),
                    "endDate": component.get("v.endDate"),
                    "discountValue": component.get("v.discountValue"),
                    "discountType": component.get("v.discountType"),
                    "productsIds": component.get("v.addedProducts").map( product => product.Id),
                });
        let action = component.get("c.addDiscount");
        action.setParams({
            "title": component.get("v.title"),
            "startDate": component.get("v.startDate"),
            "endDate": component.get("v.endDate"),
            "discountValue": component.get("v.discountValue"),
            "discountType": component.get("v.discountType"),
            "productsIds": component.get("v.addedProducts").map( product => product.Id),
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
              this.handleMessage(
                  $A.get("$Label.c.Success"),
                  $A.get("$Label.c.Add_New_Product"),
                  "success"
              );
            } else {
              this.handleMessage(
                  $A.get("$Label.c.Error"),
                  $A.get("$Label.c.Add_New_Product"),
                  "error"
              );
            }
        });
        $A.enqueueAction(action);
    },

    selectProduct: function(component, event) {
        let addedProducts = component.get("v.addedProducts");
        addedProducts.push(event.getParam("product"));
        component.set("v.addedProducts", addedProducts);
    },

    changeType: function(component) {
        let value = component.find('discountType').get('v.value');
        component.set("v.discountType", value);
    }
})