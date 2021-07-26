({
    handleFilesChange: function(component, event, helper) {
       helper.processFiles(component, event);
    },

    onAddProduct: function(component, event, helper) {
       helper.addProduct(component);
    },

    onInit: function(component, event, helper) {
        helper.getUserProducts(component);
    }
})