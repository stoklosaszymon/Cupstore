({
    handleMessage : function(title, message, type) {
        let toastParams = {
            title: title,
            message: message,
            type: type,
        };
        this.showToast(toastParams);
    },

    showToast: function(toastParams) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams(toastParams);
        toastEvent.fire();
    },
})