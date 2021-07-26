({
    onInit: function(component, event, helper) {
        helper.handleSearch(component);
    },
    handleKeyUp: function(component, event, helper) {
        if (event.which == 13){
             helper.goToHome(component);
             helper.handleSearch(component);
        }
    },
})