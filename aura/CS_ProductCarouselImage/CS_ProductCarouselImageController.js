({
    onInit: function(component, event, helper) {
        let id = component.get("v.id");
        helper.getAttachments(component, id);
    },

     onAutoScrollChange: function(component, event, helper) {
        let carousel = component.find("carousel");
        if ( carousel ) {
          carousel.set("v.disableAutoScroll", "true");
        }
     },
})