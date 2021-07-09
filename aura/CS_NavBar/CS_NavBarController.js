({
    goToCart: function(component, event, helper) {
        var pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Cart__c'
            }
        };

        var navService = component.find("navService");
        navService.navigate(pageReference);
    },
    goToWishlist: function(component, event, helper) {
        var pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Wishlist__c'
            }
        };

        var navService = component.find("navService");
        navService.navigate(pageReference);
    },
    goToHome: function(component, event, helper) {
        var pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        };

        var navService = component.find("navService");
        navService.navigate(pageReference);
    }
})