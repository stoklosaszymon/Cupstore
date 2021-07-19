public with sharing class CS_ReviewWrapper {
    @AuraEnabled
    public String id { get; set; }
    @AuraEnabled
    public String body { get; set; }
    @AuraEnabled
    public Datetime createdAt { get; set; }
    @AuraEnabled
    public Decimal rating { get; set; }
    @AuraEnabled
    public String userName { get; set; }

    public CS_ReviewWrapper (String id, String body, Datetime createdAt, Decimal rating, String userName) {
        this.id = id;
        this.body = body;
        this.createdAt = createdAt;
        this.rating = rating;
        this.userName = userName;
    }
}