({
    onInit: function(component, event, helper) {
        let action = component.get("c.getCase");
        action.setParams({
            "caseId": component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
            component.set("v.case", response.getReturnValue())
            console.log(response.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})