({
    addCase: function(component, orderId) {
        let action = component.get("c.createCase");
        action.setParams({
            "firstName": component.get("v.firstName"),
            "lastName": component.get("v.lastName"),
            "email": component.get("v.email"),
            "reason" :component.get("v.reason"),
            "subject": component.get("v.subject"),
            "description": component.get("v.description"),
            "orderId": orderId,
            "products": component.get("v.addedProducts")
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                this.handleMessage(
                    $A.get("$Label.c.Success"),
                    $A.get("$Label.c.Add_New_Case"),
                    "success"
                );
            } else {
                this.handleErrors(
                    response.getError()
                );
            }
        });
        $A.enqueueAction(action);
    },

    checkStatus: function(component) {
        let action = component.get("c.checkCaseStatus");
        action.setParams({
            "caseNumber": component.get("v.caseNumber")
        });
        action.setCallback(this, function(response) {
           let state = response.getState();
           if (state == 'SUCCESS') {
                component.set("v.caseStatus", response.getReturnValue());
           } else {
                this.handleErrors(
                    response.getError()
                );
           }
        });
        $A.enqueueAction(action);
    },

    change: function(component) {
        let value = component.find('select').get('v.value');
        component.set("v.reason", value);
    },

    getProducts: function(component) {
        let action = component.get("c.getProducts");
        action.setParams({
            "orderId": component.get("v.orderId")
        })
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                component.set("v.products", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})