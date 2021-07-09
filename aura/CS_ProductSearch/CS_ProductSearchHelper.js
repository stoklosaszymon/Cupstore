({
    handleSearch: function(component) {
        var action = component.get("c.searchProduct");
        action.setParams(
            { "query": component.get("v.query")}
        );
        action.setCallback(this, function(response) {
            var event = $A.get("e.c:CS_SearchProduct");
            event.setParams({
                "productList": response.getReturnValue(),
            });
            event.fire();
        });
        $A.enqueueAction(action);
    },
    goToHome: function(component) {
        var pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        };

        var navService = component.find("navService");
        navService.navigate(pageReference);
    }
})