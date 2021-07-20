public with sharing class CS_ShoppingCartWrapper {
    @AuraEnabled
    public String id { get; set; }
    @AuraEnabled
    public String productId { get; set; }
    @AuraEnabled
    public String name { get; set; }
    @AuraEnabled
    public Decimal price { get; set; }
    @AuraEnabled
    public Integer quantity { get; set; }
    @AuraEnabled
    public Boolean selected { get; set; }

    public CS_ShoppingCartWrapper(String id, String productId, String name, Decimal price, Integer quantity, Boolean selected) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.selected = selected;
    }
}