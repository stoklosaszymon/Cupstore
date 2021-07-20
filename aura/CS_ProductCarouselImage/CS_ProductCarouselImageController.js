({
    onInit: function(component, event, helper) {
        var id = component.get("v.id");
        helper.getAttachments(component, id);
    },
     onAutoScrollChange: function(component, event, helper) {
          var carousel = component.find("carousel");
          carousel.set("v.disableAutoScroll", "true");
     }
})