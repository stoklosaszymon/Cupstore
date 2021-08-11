({
   processTime: function(component) {
       let interval = setInterval( () => {
           let seconds = component.get("v.hotDeal.timeLeft");
           let time = new Date(seconds * 1000).toISOString().substr(11, 8);
           component.set("v.time", time);
           component.set("v.hotDeal.timeLeft", seconds - 1)
       }, 1000);
       component.set("v.interval", interval);
   },

   getHotDeal: function(component) {
        let action = component.get("c.getHotDeal");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                 component.set("v.hotDeal", response.getReturnValue());
                 component.set("v.productId", response.getReturnValue().productId);
            } else {
                this.handleErrors(
                    response.getError()
                )
            }
        })
        $A.enqueueAction(action);
   },

   redirectToProduct: function(component, event) {
       let id = event.currentTarget.dataset.id;
        let pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: id,
                objectApiName: 'Product2',
                actionName: 'view'
            }
        };

        let navService = component.find("navService");
        navService.navigate(pageReference);
   },

   change: function(component, event) {
       component.set("v.productId", event.getParam("value").productId);
   },

   destroyComponent: function(component) {
        let interval = component.get("v.interval");
        clearInterval(interval);
   }
})