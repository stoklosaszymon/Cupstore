({
    onInit: function(component, event, helper) {
        if (component.get("v.customList") == false) {
            console.log('false')
            helper.getProducts(component);
        }
    },
    handleSearch: function(component, event, helper) {
        component.set("v.products", event.getParam("productList"));
    },
    handleSelect: function(component, event, helper) {
        let productId = event.currentTarget.dataset.id;
        helper.selectProduct(component, productId);
        helper.redirectToProduct(component, productId);
    },
    onHover: function(component, event, helper) {
        let index = event.currentTarget.dataset.id;
        let carousel = component.find("imgCarousel")[index];
        carousel.set("v.autoScroll", true);
    },
    onLeave: function(component, event, helper) {
        let index = event.currentTarget.dataset.id;
        let carousel = component.find("imgCarousel")[index];
        carousel.set("v.autoScroll", false);
    },
})