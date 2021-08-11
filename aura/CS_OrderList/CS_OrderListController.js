({
    onInit: function(component, event, helper) {
        helper.getOrders(component);
    },
    onOpenModal: function(component, event, helper) {
        helper.openModal(component, event);
    }
})