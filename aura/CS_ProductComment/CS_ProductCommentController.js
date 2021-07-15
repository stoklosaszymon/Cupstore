({
    onChange: function(component, event, helper) {
        helper.getReviews(component);
        helper.getCommentsCount(component);
    },
    onAddReview: function(component, event, helper) {
       helper.addReview(component);
       helper.getCommentsCount(component);
    },
    onNextPage: function(component, event, helper) {
        var page = component.get("v.page");
        if ( page < component.get("v.maxPageSize")) {
            component.set("v.page", page + 1);
        }
        helper.getReviews(component);
    },
    onPrevPage: function(component, event, helper) {
        var page = component.get("v.page");
        if ( page > 1) {
            component.set("v.page", page - 1);
        }
        helper.getReviews(component);
    },
    onRate: function(component, event, helper) {
        component.set("v.rating", event.getParam("rating"));
    }
})