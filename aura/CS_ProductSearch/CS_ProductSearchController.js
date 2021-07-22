({
    onInit: function(component, event, helper) {
        let query = sessionStorage.getItem( 'query' );
        component.set("v.query", query);
        helper.handleSearch(component);
    },
    handleKeyUp: function(component, event, helper) {
        if (event.which == 13){
             helper.goToHome(component);
             helper.handleSearch(component);
        }
    },
})