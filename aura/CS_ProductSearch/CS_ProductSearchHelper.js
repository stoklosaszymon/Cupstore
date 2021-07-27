({
    handleSearch: function(component) {
        let query = sessionStorage.getItem( 'query' );
        let action = component.get("c.searchProduct");
        action.setParams({
             "query": query ? query : ''
         });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                let event = $A.get("e.c:CS_SearchProduct");
                event.setParams({
                    "productList": response.getReturnValue(),
                });
                event.fire();
            }
        });
        $A.enqueueAction(action);
    },
    goToHome: function(component) {
        let pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            },
        };
        sessionStorage.setItem( 'query', component.get("v.query") );
        let navService = component.find("navService");
        navService.navigate(pageReference);
    }
})
// obsluga bledow