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
        helper.nextPage(component);
        helper.getReviews(component);
    },
    onPrevPage: function(component, event, helper) {
        helper.prevPage(component);
        helper.getReviews(component);
    },
    onRate: function(component, event, helper) {
        helper.setRating(component);
    }
})