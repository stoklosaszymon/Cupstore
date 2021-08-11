({
    goToCart: function(component) {
         let pageReference = {
             type: 'comm__namedPage',
             attributes: {
                 name: 'Cart__c'
             }
         };
         let navService = component.find("navService");
         navService.navigate(pageReference);
    },

    goToWishlist: function(component) {
        let pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Wishlist__c'
            }
        };

        let navService = component.find("navService");
        navService.navigate(pageReference);
     },

    goToHome: function(component) {
        var pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        };

        var navService = component.find("navService");
        navService.navigate(pageReference);
       },


    goToComplaint: function(component) {
        var pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Complaint__c'
            }
        };

        var navService = component.find("navService");
        navService.navigate(pageReference);
       },


    goToOrders: function(component) {
        var pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Orders__c'
            }
        };

        var navService = component.find("navService");
        navService.navigate(pageReference);
       },

    handleSelect: function (component, event) {
        let value = event.getParam("value");
        if (value == 'Complaint') {
            this.goToComplaint(component);
        }
        else if (value == 'Orders') {
            this.goToOrders(component);
        }
    }
})