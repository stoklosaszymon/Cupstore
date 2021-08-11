({
    getOrders: function(component) {
        let action = component.get("c.getOrders");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state = 'SUCCESS') {
                component.set("v.orders", response.getReturnValue());
            } else {
                this.handleErrors(
                    response.getErrors()
                );
            }
        });
        $A.enqueueAction(action);
    },

    openModal: function(component, event) {
        let id = event.currentTarget.dataset.id;
        let modal = component.find("modal");
        modal.set("v.orderId", id);
        modal.set("v.isOpen", true);
    }
})