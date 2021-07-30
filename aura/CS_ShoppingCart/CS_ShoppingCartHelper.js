({
    getOverallSum: function(component) {
       let products = component.get("v.shoppingCart");
       let prices = products.map( product => product.price * product.quantity );
       let overallSum = prices.reduce( (acc, price) => acc + price);
       console.log(overallSum)
       component.set("v.overallSum", overallSum);
    },

    getCartProducts: function(component) {
        var action = component.get("c.getCartProducts");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                console.log(response.getReturnValue())
                component.set("v.shoppingCart", response.getReturnValue());
                this.getOverallSum(component);
            }
        });
        $A.enqueueAction(action);
    },

    removeFromCart: function(component, event) {
        let index = event.currentTarget.dataset.id;
        let id = this.getProductId(component, event);
        var action = component.get("c.removeFromCart");
        action.setParams({
            "productId": id
        })
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
               this.handleMessage(
                   $A.get("$Label.c.Success"),
                   $A.get("$Label.c.Removed_From_Cart"),
                   "success"
               );
               this.getCartProducts(component);
               this.getOverallSum(component);
            }
        });
        $A.enqueueAction(action);
    },

    increaseQuantity: function(component, event) {
        var id = event.currentTarget.dataset.id;
        var action = component.get("c.increaseQuantity");
        action.setParams({
            "id": id
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
              this.getOverallSum(component);
              this.getCartProducts(component);
            }
        });
        $A.enqueueAction(action);
    },

    decreaseQuantity: function(component, event) {
        var id = event.currentTarget.dataset.id;
        var action = component.get("c.decreaseQuantity");
        action.setParams({
            "id": id
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
              this.getOverallSum(component);
              this.getCartProducts(component);
            }
        });
        $A.enqueueAction(action);
    },

    selectProduct: function(component, event) {
        var productId = event.getSource().get("v.name");
        var action = component.get("c.selectProduct");
        action.setParams({
            "id": id
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
              this.getOverallSum(component);
            }
        })
        $A.enqueueAction(action);
    },

    getProductId: function(component, event) {
        var index = event.currentTarget.dataset.id;
        let products = component.get("v.shoppingCart");
        return products[index].id;
    },

    setRemovedClass: function(component, event) {
        var index = event.currentTarget.dataset.id;
        console.log(index);
        let target = component.find('listItem');
        if (target.length) {
            $A.util.addClass(target[index], 'removed');
        } else {
            $A.util.addClass(target, 'removed');
        }
    },

    goToOrder: function(component) {
        var pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Order__c'
            }
        };

        var navService = component.find("navService");
        navService.navigate(pageReference);
    },

})