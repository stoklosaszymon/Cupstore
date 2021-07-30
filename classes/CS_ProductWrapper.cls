public with sharing class CS_ProductWrapper {
    @AuraEnabled
    public String id { get; set; }
    @AuraEnabled
    public String name { get; set; }
    @AuraEnabled
    public Decimal price { get; set; }
    @AuraEnabled
    public Decimal afterDiscountPrice { get; set; }
    @AuraEnabled
    public String colors { get; set; }
    @AuraEnabled
    public String description { get; set; }
    @AuraEnabled
    public String shortDescription { get; set; }
    @AuraEnabled
    public String material { get; set; }
    @AuraEnabled
    public Decimal volume { get; set; }

    public CS_ProductWrapper(
            String id,
            String name,
            String description,
            Decimal price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}