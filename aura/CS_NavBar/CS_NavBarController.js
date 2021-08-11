({
    goToCart: function(component, event, helper) {
       helper.goToCart(component);
    },

    goToWishlist: function(component, event, helper) {
       helper.goToWishlist(component);
    },

    goToHome: function(component, event, helper) {
       helper.goToHome(component);
    },

    onSelect: function (component, event, helper) {
       helper.handleSelect(component, event);
    }
})