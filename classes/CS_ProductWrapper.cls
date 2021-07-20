public with sharing class CS_ProductWrapper {
    @AuraEnabled
    public String id { get; set; }
    @AuraEnabled
    public String name { get; set; }
    @AuraEnabled
    public Decimal price { get; set; }
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
            Decimal price,
            String colors,
            String description,
            String shortDescription,
            String material,
            Decimal volume) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.colors = colors;
        this.description = description;
        this.shortDescription = shortDescription;
        this.material = material;
        this.volume = volume;
    }
}