({
    handleKeyUp: function(component, event, helper) {
        if (event.which == 13){
             helper.handleSearch(component);
             helper.goToHome(component);
        }
    }
})