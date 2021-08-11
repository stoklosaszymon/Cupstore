({
    onInit: function(component, event, helper) {
        helper.processTime(component);
        helper.getHotDeal(component);
   },

   onRedirectToProduct: function(component, event, helper) {
        helper.redirectToProduct(component, event);
   },

   onChange: function(component, event, helper) {
       helper.change(component, event)
   },

   handleDestroy: function(component, event, helper) {
       helper.destroyComponent(component);
   }
})
