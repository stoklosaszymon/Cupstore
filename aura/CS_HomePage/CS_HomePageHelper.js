({
    getTopRated: function(component) {
        let action = component.get("c.getTopRated");
        action.setCallback(this, function(response) {
            console.log("top ", response.getReturnValue());
           component.set("v.topRated", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },

    getRandom: function(component) {
        let action = component.get("c.getRandom");
        action.setCallback(this, function(response) {
           component.set("v.random", response.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})