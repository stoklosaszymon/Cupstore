({
    onInit: function(component, event, helper) {
       var action = component.get("c.getProducts");
       action.setCallback(this, function(response) {
           component.set("v.products",response.getReturnValue());
           component.set("v.filteredProducts",response.getReturnValue());
           console.log(response.getReturnValue());
       });
       $A.enqueueAction(action);
    },
    handleSearch: function(component, event, helper) {
        component.set("v.products", event.getParam("productList"));
        component.set("v.filteredProducts", event.getParam("productList"));
    },
    handleSelect: function(component, event, helper) {
        var productId = event.currentTarget.dataset.id;
        helper.selectProduct(component, productId);
        helper.redirectToProduct(component, productId);
    },
    onHover: function(component, event, helper) {
        var index = event.currentTarget.dataset.id;
        var carousel = component.find("imgCarousel")[index];
        carousel.set("v.autoScroll", true);
    },
    onLeave: function(component, event, helper) {
        var index = event.currentTarget.dataset.id;
        var carousel = component.find("imgCarousel")[index];
        carousel.set("v.autoScroll", false);
    },
    filterByPrice: function(component, event, helper) {
        let minPrice = component.get("v.priceMin");
        let maxPrice = component.get("v.priceMax");
        let list = component.get("v.products");

        if ( minPrice ) {
             let newList = list.filter( (product) => product.Price__c > minPrice);
             component.set("v.filteredProducts", newList);
        }

        if ( minPrice ) {
             let newList = list.filter( (product) => product.Price__c < maxPrice);
             component.set("v.filteredProducts", newList);
        }

        if (minPrice && maxPrice) {
            let newList = list.filter( (product) => product.Price__c < maxPrice && product.Price__c > minPrice);
            component.set("v.filteredProducts", newList);
        } else {
            component.set("v.filteredProducts", list);
        }
    }
})