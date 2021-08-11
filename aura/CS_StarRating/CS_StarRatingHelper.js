({
    setRating: function(component, value) {
        let event = component.getEvent("Rate");
        event.setParams({
            "rating": value
        })
        event.fire();
    }
})