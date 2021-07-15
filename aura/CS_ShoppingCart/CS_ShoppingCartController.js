({
    onInit: function(component, event, helper) {
       helper.getCartProducts(component);
       helper.getOverallSum(component);
    },
    onRemove: function(component, event, helper) {
        var productId = event.currentTarget.dataset.id;
        helper.removeFromCart(component, productId);
        helper.getOverallSum(component);
    },
    onIncreaseQuantity: function(component, event, helper) {
       var id = event.currentTarget.dataset.id;
       helper.increaseQuantity(component, id);
    },
    onDecreaseQuantity: function(component, event, helper) {
       var id = event.currentTarget.dataset.id;
       helper.decreaseQuantity(component, id);
    }
})