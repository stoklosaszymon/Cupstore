({
    handleSearch: function(component) {
        let query = sessionStorage.getItem( 'query' );
        let action = component.get("c.searchProduct");
        console.log("search", query);
        action.setParams({
             "query": query == undefined ? ' ': query
         });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                let event = $A.get("e.c:CS_SearchProduct");
                event.setParams({
                    "productList": response.getReturnValue(),
                });
                event.fire();
            } else {
              this.handleMessage(
                  $A.get("$Label.c.Error"),
                  $A.get("$Label.c.Error_Add_Discount"),
                  "error"
              );
            }
        });
        $A.enqueueAction(action);
    },
    goToHome: function(component) {
        let pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'productList__c'
            },
        };
        sessionStorage.setItem( 'query', component.get("v.query") );
        let navService = component.find("navService");
        navService.navigate(pageReference);
    }
})
