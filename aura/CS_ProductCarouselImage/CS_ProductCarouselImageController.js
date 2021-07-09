({
    onChange: function(component, event, helper) {
        var id = event.getParam("value").Id;
        helper.getAttachments(component, id);
    },
    onInit: function(component, event, helper) {
        var id = component.get("v.id");
        helper.getAttachments(component, id);
    },
     onAutoScrollChange: function(component, event, helper) {
         console.log(component.get("v.autoScroll"))
          var carousel = component.find("carousel");
          carousel.set("v.disableAutoScroll", "true");
     }
})