({
    onInit: function(component, event, helper) {
        helper.getProduct(component);
        helper.getOverallRating(component);
    },

    onAddToCart: function(component, event, helper) {
        helper.addToShoppingCart(component, helper);
    },

    increaseQuantity: function(component, event, helper) {
       helper.increaseQuantity(component);
    },

    decreaseQuantity: function(component, event, helper) {
      helper.decreaseQuantity(component);
    }
})