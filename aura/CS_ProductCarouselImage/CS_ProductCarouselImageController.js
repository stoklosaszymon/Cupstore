({
    onInit: function(component, event, helper) {
        var id = component.get("v.id");
        helper.getAttachments(component, id);
    },
     onAutoScrollChange: function(component, event, helper) {
          console.log('zmiana')

          var carousel = component.find("carousel");
          carousel.set("v.disableAutoScroll", "true");
     }
})