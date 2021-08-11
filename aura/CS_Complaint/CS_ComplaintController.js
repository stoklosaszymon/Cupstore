({
    onAddCase: function(component, event, helper) {
       let params = event.getParam('arguments');
       if (params) {
           let orderId = params.orderId;
           helper.addCase(component, orderId);
       }
    },

    onInit: function(component, event, helper) {
        helper.getProducts(component);
    },

    onChange: function (component, event, helper) {
       helper.change(component);
    },

    addProductToCase: function(component, event) {
        let addedProducts = component.get("v.addedProducts");
        let productId = event.currentTarget.dataset.id;
        if (addedProducts.includes(productId)) {
            addedProducts = addedProducts.filter(id => id != productId);
        } else {
            addedProducts.push(productId);
        }
        component.set("v.addedProducts", addedProducts);
    }
})