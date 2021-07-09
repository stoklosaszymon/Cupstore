({
    onInit: function(component, event, helper) {
        var idFromUrl = component.get("v.recordId");
        if(idFromUrl != null) {
           helper.getProduct(component, idFromUrl);
        }
    },
    handleSelect: function(component, event, helper) {
        var idFromUrl = component.get("v.productId");
        console.log(idFromUrl);
        var id = event.getParam("productId");
        helper.getProduct(component, id);
    }
})