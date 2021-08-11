({
    getWishlist: function(component) {
        let action = component.get("c.getWishlist");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state = 'SUCCESS') {
                component.set("v.wishlist", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    removeFromWishlist: function(component, id) {
        let action = component.get("c.removeFromWishlist");
        action.setParams({
            "id": id
        })
        action.setCallback(this, function(response) {
            this.getWishlist(component);
        });
        $A.enqueueAction(action);
    },

    goToProduct: function(component, event) {
       let id = event.currentTarget.dataset.id;
       let pageReference = {
           type: 'standard__recordPage',
           attributes: {
               recordId: id,
               objectApiName: 'Cup__c',
               actionName: 'view'
           }
       };
       let navService = component.find("navService");
       navService.navigate(pageReference);
    }
})