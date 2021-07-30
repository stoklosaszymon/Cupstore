public with sharing class CS_ProductListWrapper {

    @AuraEnabled
    public String id {get; set;}
    @AuraEnabled
    public String name {get; set;}
    @AuraEnabled
    public Decimal price {get; set;}

    public CS_ProductListWrapper(String id, String name, Decimal price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

}