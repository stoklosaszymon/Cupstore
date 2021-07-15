({
    getOverallSum: function(component) {
       var action = component.get("c.getOverallSum");
       action.setCallback(this, function(response) {
           if (response.getReturnValue() != null) {
               component.set("v.overallSum", response.getReturnValue());
           }
       });
       $A.enqueueAction(action);
    },
    getCartProducts: function(component) {
        var action = component.get("c.getCartProducts");
        action.setCallback(this, function(response) {
            component.set("v.shoppingCart", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    removeFromCart: function(component, id) {
        var action = component.get("c.removeFromCart");
        action.setParams({
            "productId": id
        })
        action.setCallback(this, function(response) {
            this.getCartProducts(component);
            this.getOverallSum(component);
        });
        $A.enqueueAction(action);
    },
    increaseQuantity: function(component, id) {
        var action = component.get("c.increaseQuantity");
        action.setParams({
            "id": id
        });
        action.setCallback(this, function(response) {
            this.getOverallSum(component);
            this.getCartProducts(component);
        });
        $A.enqueueAction(action);
    },
    decreaseQuantity: function(component, id) {
        var action = component.get("c.decreaseQuantity");
        action.setParams({
            "id": id
        });
        action.setCallback(this, function(response) {
            this.getOverallSum(component);
            this.getCartProducts(component);
        });
        $A.enqueueAction(action);
    },
})