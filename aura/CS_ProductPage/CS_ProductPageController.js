({
    onInit: function(component, event, helper) {
        var id = component.get("v.recordId");
        helper.getProduct(component, id);
        helper.getOverallRating(component, id);
    },
    handleSelect: function(component, event, helper) {
        var id = event.getParam("productId");
        helper.getProduct(component, id);
    },
    onAddToCart: function(component, event, helper) {
        helper.addToShoppingCart(component);
    },
    increaseQuantity: function(component, event, helper) {
       helper.increaseQuantity(component);
    },
    decreaseQuantity: function(component, event, helper) {
      helper.decreaseQuantity(component);
    }
})