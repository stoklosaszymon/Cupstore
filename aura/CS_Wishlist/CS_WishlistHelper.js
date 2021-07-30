({
    getWishlist: function(component) {
        var action = component.get("c.getWishlist");
        action.setCallback(this, function(response) {
            console.log( response.getReturnValue());
            component.set("v.wishlist", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    removeFromWishlist: function(component, id) {
        var action = component.get("c.removeFromWishlist");
        action.setParams({
            "id": id
        })
        action.setCallback(this, function(response) {
            this.getWishlist(component);
        });
        $A.enqueueAction(action);
    },
    goToProduct: function(component, id) {
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
    }
})