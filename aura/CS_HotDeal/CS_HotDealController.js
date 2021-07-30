({
    onInit: function(component, event, helper) {
        helper.processTime(component);
        let action = component.get("c.getHotDeal");
        action.setCallback(this, function(response) {
            component.set("v.hotDeal", response.getReturnValue());
            component.set("v.productId", response.getReturnValue().productId);
        })
        $A.enqueueAction(action);
   },

   onRedirectToProduct: function(component, event, helper) {
       let id = event.currentTarget.dataset.id;
        var pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: id,
                objectApiName: 'Product2',
                actionName: 'view'
            }
        };

        var navService = component.find("navService");
        navService.navigate(pageReference);
   },

   onChange: function(component, event, helper) {
       component.set("v.productId", event.getParam("value").productId);
   }
})
