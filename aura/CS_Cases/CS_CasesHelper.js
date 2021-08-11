({
    getFeeds: function(component) {
      let action = component.get("c.getCases");
      action.setCallback(this, function(response) {
          let state = response.getState();
          if( state = 'SUCCESS') {
              component.set("v.cases", response.getReturnValue())
          }
      });
      $A.enqueueAction(action);
    },

    redirectToFeeds: function(component, event) {
      let id = event.currentTarget.dataset.id;
      var pageReference = {
          type: 'standard__recordPage',
          attributes: {
              recordId: id,
              objectApiName: 'Case',
              actionName: 'view'
          }
      };

      var navService = component.find("navService");
      navService.navigate(pageReference);
    }
})