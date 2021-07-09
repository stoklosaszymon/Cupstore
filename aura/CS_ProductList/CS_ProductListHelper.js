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
    onHover: function(component, event, helper) {
        console.log("asdasda")
        var carousel = component.find("imgCarousel");
        carousel.set("autoScroll", "false");
        console.log(carousel.get("autoScroll"));
    }
})