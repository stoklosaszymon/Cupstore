({
    getOverallSum: function(component) {
       let products = component.get("v.shoppingCart");
       let prices = products.map( product => product.price * product.quantity );
       let overallSum = prices.reduce( (acc, price) => acc + price);
       console.log(overallSum)
       component.set("v.overallSum", overallSum);
    },

    getCartProducts: function(component) {
        let action = component.get("c.getCartProducts");
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
        let action = component.get("c.removeFromCart");
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
        let id = event.currentTarget.dataset.id;
        let action = component.get("c.increaseQuantity");
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
        let id = event.currentTarget.dataset.id;
        let action = component.get("c.decreaseQuantity");
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
        let productId = event.getSource().get("v.name");
        let action = component.get("c.selectProduct");
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
        let index = event.currentTarget.dataset.id;
        let products = component.get("v.shoppingCart");
        return products[index].id;
    },

    setRemovedClass: function(component, event) {
        let index = event.currentTarget.dataset.id;
        console.log(index);
        let target = component.find('listItem');
        if (target.length) {
            $A.util.addClass(target[index], 'removed');
        } else {
            $A.util.addClass(target, 'removed');
        }
    },

    goToOrder: function(component) {
        let pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Order__c'
            }
        };

        let navService = component.find("navService");
        navService.navigate(pageReference);
    },

})