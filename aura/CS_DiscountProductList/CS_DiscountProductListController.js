({
    onInit: function(component, event, helper) {
        helper.getProducts(component);
    },

    onSelectProduct: function(component, event, helper) {
        helper.selectProduct(component, event);
    },

    onChange: function(component, event, helper) {
       helper.restoreRemovedProducts(component, event);
    }
})