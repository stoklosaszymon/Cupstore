({
    getReviews: function(component) {
      var action = component.get("c.getThreeReviews");
             action.setParams({
                 "productId": component.get("v.productId"),
                 "page": component.get("v.page")
             });
             action.setCallback(this, function(response) {
                 var result = response.getReturnValue();
                 component.set("v.reviews", result)
            });
            $A.enqueueAction(action);
    },
    getCommentsCount: function(component) {
        var action = component.get("c.getCommentsCount");
        action.setParams({
            "productId" : component.get("v.productId"),
        });
        action.setCallback(this, function(response) {
            var result = response.getReturnValue();
            component.set("v.maxPageSize", Math.ceil(result / 3));
        });
        $A.enqueueAction(action);
    },
    addReview: function(component) {
        var action = component.get("c.addReview");
        action.setParams({
            "text": component.get("v.body"),
            "rating": component.get("v.rating"),
            "productId": component.get("v.productId"),
        });
        action.setCallback(this, function(response){
            this.getReviews(component);
            component.set("v.rating", 0);
            component.set("v.body", '');
        });
        $A.enqueueAction(action);
    }
})