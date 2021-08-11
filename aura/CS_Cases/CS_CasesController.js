({
    onInit: function(component, event, helper) {
       helper.getFeeds(component);
    },

    goToFeeds: function(component, event, helper) {
       helper.redirectToFeeds(component, event);
    },
})