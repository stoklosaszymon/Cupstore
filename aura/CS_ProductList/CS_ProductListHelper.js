({
    selectProduct: function(component, id) {
       var event = $A.get("e.c:CS_SelectProduct");
       event.setParams({
           "productId": id,
       });
       event.fire();
    },
    redirectToProduct: function(component, id) {
        var pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: id,
                objectApiName: 'Cup__c',
                actionName: 'view'
            }
        };

        var navService = component.find("navService");
        navService.navigate(pageReference);
    },
})