({
    getProducts: function(component) {
       let action = component.get("c.getProducts");
       action.setCallback(this, function(response) {
           let state = response.getState();
           if (state = 'SUCCESS') {
               component.set("v.allProducts", response.getReturnValue());
               component.set("v.products", response.getReturnValue());
           }
       });
       $A.enqueueAction(action);
    },

    selectProduct: function(component, event) {
       let productId = event.currentTarget.dataset.id;
       let products = component.get("v.products");
       let componentEvent = component.getEvent("selectDiscountProduct");
       componentEvent.setParams({
           "product": products.find( product => product.Id == productId),
       });
       componentEvent.fire();
    },

    restoreRemovedProducts: function(component, event) {
        let ids = event.getParam("value").map( product => product.Id);
        let products = component.get("v.allProducts");
        component.set("v.products", products.filter( product => !ids.includes(product.Id)));
    }
})