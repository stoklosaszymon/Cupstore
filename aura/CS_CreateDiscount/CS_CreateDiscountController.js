({
    onSelectProduct: function(component, event, helper) {
        helper.selectProduct(component, event);
    },

    onAddDiscount: function(component, event, helper) {
       helper.addDiscount(component);
    },

    onTypeChange: function(component, event, helper) {
       helper.changeType(component);
    },

    onRemove: function(component, event, helper) {
        helper.removeFromList(component, event);
    }
})