({
    getAttachments: function(component, id) {
      var action = component.get("c.getProductAttachments");
      action.setParams({ "id": id});
      action.setCallback(this, function(response) {
          component.set("v.attachments", response.getReturnValue());
      });
      $A.enqueueAction(action);
    }
})