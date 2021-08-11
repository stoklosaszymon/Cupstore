({
    handleSearch: function(component) {
        let query = sessionStorage.getItem( 'query' );
        component.set("v.query", query == undefined ? ' ': query);
        let action = component.get("c.searchProduct");
        action.setParams({
             "query": component.get("v.query")
         });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                console.log(response.getReturnValue());
                let event = $A.get("e.c:CS_SearchProduct");
                event.setParams({
                    "productList": response.getReturnValue(),
                });
                event.fire();
            } else {
              this.handleErrors(
                  response.getError()
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
