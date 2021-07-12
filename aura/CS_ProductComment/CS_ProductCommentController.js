({
    onChange: function(component, event, helper) {
        helper.getReviews(component);
    },
    onAddReview: function(component, event, helper) {
        var action = component.get("c.addReview");
        action.setParams({
            "text": component.get("v.body"),
            "productId": component.get("v.productId")
        });
        action.setCallback(this, function(response){
            helper.getReviews(component)
        });
        $A.enqueueAction(action);
    }
})