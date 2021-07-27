({
    onInit: function(component, event, helper) {
        let action = component.get("c.getProducts");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state = 'SUCCESS') {
                component.set("v.products", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    selectProduct: function(component, event, helper) {
       let productId = event.currentTarget.dataset.id;
       let products = component.get("v.products");
       let componentEvent = component.getEvent("selectDiscountProduct");
       componentEvent.setParams({
           "product": products.find( product => product.Id == productId),
       });
       componentEvent.fire();
    },
})