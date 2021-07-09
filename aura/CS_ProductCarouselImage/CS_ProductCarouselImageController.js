({
    onChange: function(component, event, helper) {
        var id = event.getParam("value").Id;
        helper.getAttachments(component, id);
    },
    onInit: function(component, event, helper) {
        var id = component.get("v.id");
        helper.getAttachments(component, id);
    },
    onHover: function(component, event, helper) {
       var carousel = component.find("carousel");
       carousel.set("v.disableAutoScroll", "false");
       console.log(carousel.get("v.disableAutoScroll"));
    }
})