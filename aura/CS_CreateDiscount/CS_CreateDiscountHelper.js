({
    addDiscount: function(component) {
        let action = component.get("c.addDiscount");
        action.setParams({
            "title": component.get("v.title"),
            "startDate": component.get("v.startDate"),
            "endDate": component.get("v.endDate"),
            "discountValue": component.get("v.discountValue"),
            "discountType": component.get("v.discountType"),
            "productsIds": component.get("v.addedProducts").map( product => product.Product2.Id),
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
              this.handleMessage(
                  $A.get("$Label.c.Success"),
                  $A.get("$Label.c.Add_Discount"),
                  "success"
              );
            } else {
              this.handleErrors(
                 response.getError()
              );
            }
        });
        $A.enqueueAction(action);
    },

    selectProduct: function(component, event) {
        let addedProducts = component.get("v.addedProducts");
        let product = event.getParam("product");
        component.set("v.addedProducts", this.filterList(component, product.id));
        addedProducts.push(product);
        component.set("v.addedProducts", addedProducts);
    },

    changeType: function(component) {
        let value = component.find('discountType').get('v.value');
        component.set("v.discountType", value);
    },

    removeFromList: function(component, event) {
        let id = event.currentTarget.dataset.id;
        component.set("v.addedProducts", this.filterList(component, id));
    },

    filterList: function(component, id) {
        let products = component.get("v.addedProducts");
        return products.filter(product => product.Product2Id != id);
    }
})