({
    getReviews: function(component) {
      let action = component.get("c.getThreeReviews");
       action.setParams({
           "productId": component.get("v.productId"),
           "page": component.get("v.page")
       });
       action.setCallback(this, function(response) {
           let state = response.getState();
           if (state == 'SUCCESS') {
              component.set("v.reviews", response.getReturnValue());
           } else {
              this.handleMessage($A.get("$Label.c.Error"), $A.get("$Label.c.Error_Get_Reviews"), "error");
           }
      });
      $A.enqueueAction(action);
    },

    getCommentsCount: function(component) {
        let action = component.get("c.getCommentsCount");
        action.setParams({
            "productId" : component.get("v.productId"),
        });
        action.setCallback(this, function(response) {
           let state = response.getState();
           if (state == 'SUCCESS') {
              let result = response.getReturnValue();
              component.set("v.maxPageSize", Math.ceil(result / 3));
           }
        });
        $A.enqueueAction(action);
    },

    addReview: function(component) {
        let action = component.get("c.addReview");
        action.setParams({
            "text": component.get("v.body"),
            "rating": component.get("v.rating"),
            "productId": component.get("v.productId"),
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state == 'SUCCESS') {
                this.getReviews(component);
                component.set("v.rating", 0);
                component.set("v.body", '');
                this.handleMessage($A.get("$Label.c.Success"), $A.get("$Label.c.Review_Added"), 'success');
            } else {
                this.handleMessage($A.get("$Label.c.Error"), $A.get("$Label.c.Error_Add_Review"), 'error');
            }
        });
        $A.enqueueAction(action);
    },
    nextPage: function(component) {
        let page = component.get("v.page");
        if ( page < component.get("v.maxPageSize")) {
            component.set("v.page", page + 1);
        }
    },
    prevPage: function(component) {
        let page = component.get("v.page");
        if ( page > 1) {
            component.set("v.page", page - 1);
        }
    },
    setRating: function(component) {
        component.set("v.rating", event.getParam("rating"));
    }
})