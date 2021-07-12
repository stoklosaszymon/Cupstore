({
    getOverallSum: function(component) {
       var action = component.get("c.getOverallSum");
       action.setCallback(this, function(response) {
           component.set("v.overallSum", response.getReturnValue());
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
        });
        $A.enqueueAction(action);
    }
})