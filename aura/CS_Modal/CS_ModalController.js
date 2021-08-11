({
   openModel: function(component, event, helper) {
      component.set("v.isOpen", true);
   },

   closeModel: function(component, event, helper) {
      component.set("v.isOpen", false);
   },

   addNewCase: function(component, event, helper) {
      let complaint = component.find("complaint");
      let id = component.get("v.orderId");
      complaint.addNewCase(id);
      setTimeout( () => {
         component.set("v.isOpen", false);
      }, 2000);
   },
})

