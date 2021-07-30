({
    onInit: function(component, event, helper) {
        helper.getCartProducts(component);
    },

    onCreateOrder: function(component, event, helper) {
        helper.createOrder(component);
    }
})