({
    setRating: function(component, value) {
        var event = component.getEvent("Rate");
        event.setParams({
            "rating": value
        })
        event.fire();
    }
})