({
    onInit: function(component, event, helper) {
       helper.getCartProducts(component);
    },
    onRemove: function(component, event, helper) {
        helper.setRemovedClass(component, event);
        helper.removeFromCart(component, event);
    },
    onIncreaseQuantity: function(component, event, helper) {
       helper.increaseQuantity(component, event);
    },
    onDecreaseQuantity: function(component, event, helper) {
       helper.decreaseQuantity(component, event);
    },
    onSelect: function(component, event, helper) {
        helper.selectProduct(component, event);
    },
    onGoToOrder: function(component, event, helper) {
        helper.goToOrder(component);
    }
})