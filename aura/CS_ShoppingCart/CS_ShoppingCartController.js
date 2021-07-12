({
    onInit: function(component, event, helper) {
       helper.getCartProducts(component);
       helper.getOverallSum(component);
    },
    onRemove: function(component, event, helper) {
        var productId = event.currentTarget.dataset.id;
        helper.removeFromCart(component, productId);
    },
    onAdd: function(component, event, helper) {
        var products = component.get("v.shoppingCart");
        var productId = event.currentTarget.dataset.id;
        console.log("p", productId);
    }
})