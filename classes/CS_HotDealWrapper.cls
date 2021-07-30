public with sharing class CS_HotDealWrapper {
    @AuraEnabled
    public String productId {get; set;}
    @AuraEnabled
    public String productName {get; set;}
    @AuraEnabled
    public Decimal discountValue {get; set;}
    @AuraEnabled
    public Decimal price {get; set;}
    @AuraEnabled
    public Decimal standardPrice {get; set;}
    @AuraEnabled
    public Decimal timeLeft {get; set;}


    public CS_HotDealWrapper(
            String productId,
            String productName,
            Decimal discountValue,
            Decimal price,
            Decimal standardPrice,
            Decimal timeLeft) {
        this.productId = productId;
        this.productName = productName;
        this.discountValue = discountValue;
        this.price = price;
        this.standardPrice = standardPrice;
        this.timeLeft = timeLeft;
    }
}
