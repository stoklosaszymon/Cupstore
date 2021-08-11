({
    handleMessage : function(title, message, type) {
        let toastParams = {
            title: title,
            message: message,
            type: type,
        };
        this.showToast(toastParams);
    },

    handleErrors : function(errors) {
        let pageErrors = [];
        let fieldErrors = [];
        errors.forEach( error => {
            pageErrors.push(error.pageErrors);
            fieldErrors.push(error.fieldErrors);
        });
        pageErrors.forEach( errors => {
            errors.forEach( error => {
                 let toastParams = {
                     title: $A.get("$Label.c.Error"),
                     message: error.message,
                     type: 'error',
                 };
                 this.showToast(toastParams);
            })
        });
        fieldErrors.forEach( err => {
            Object.values(err).forEach( error => {
                error.forEach( e => {
                     let toastParams = {
                         title: $A.get("$Label.c.Error"),
                         message: e.message,
                         type: 'error',
                     };
                     this.showToast(toastParams);
                })
            });
        });
    },

    showToast: function(toastParams) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams(toastParams);
        toastEvent.fire();
    },
})