({
    getTopRated: function(component) {
        let action = component.get("c.getTopRated");
        action.setCallback(this, function(response) {
           let state = response.getState();
           if (state == 'SUCCESS') {
                component.set("v.topRated", response.getReturnValue());
           } else {
               this.handleErrors(
                   response.getError()
               );
           }
        });
        $A.enqueueAction(action);
    },

    getRandom: function(component) {
        let action = component.get("c.getRandom");
        action.setCallback(this, function(response) {
           let state = response.getState();
           if (state == 'SUCCESS') {
                component.set("v.random", response.getReturnValue());
           } else {
               this.handleErrors(
                   response.getError()
               );
           }
        });
        $A.enqueueAction(action);
    }
})