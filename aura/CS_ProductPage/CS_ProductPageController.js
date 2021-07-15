({
    onInit: function(component, event, helper) {
        var id = component.get("v.recordId");
        helper.getProduct(component, id);
        helper.getOverallRating(component, id);
    },
    handleSelect: function(component, event, helper) {
        var idFromUrl = component.get("v.productId");
        var id = event.getParam("productId");
        helper.getProduct(component, id);
    },
    onAddToCart: function(component, event, helper) {
        helper.addToShoppingCart(component);
    },
    increaseQuantity: function(component, event, helper) {
        var quantity = component.get("v.quantity");
        component.set("v.quantity", quantity + 1);
    },
    decreaseQuantity: function(component, event, helper) {
       var quantity = component.get("v.quantity");
       if (quantity > 1) {
        component.set("v.quantity", quantity - 1);
       }
    }
})