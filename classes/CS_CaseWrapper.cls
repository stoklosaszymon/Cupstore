public with sharing class CS_CaseWrapper {

    @AuraEnabled
    public String id { get; set; }
    @AuraEnabled
    public String subject { get; set; }
    @AuraEnabled
    public String description { get; set; }
    @AuraEnabled
    public String caseNumber { get; set; }
    @AuraEnabled
    public String reason { get; set; }
    @AuraEnabled
    public String status { get; set; }
    @AuraEnabled
    public DateTime createdDate { get; set; }
    @AuraEnabled
    public String orderNumber { get; set; }
    @AuraEnabled
    public List<ProductCase__c> products { get; set; }

    public CS_CaseWrapper(
            String id,
            String subject,
            String description,
            String caseNumber,
            String reason,
            String status,
            DateTime createdDate,
            String orderNumber,
            List<ProductCase__c> products) {
        this.id = id;
        this.subject = subject;
        this.description = description;
        this.caseNumber = caseNumber;
        this.reason = reason;
        this.status = status;
        this.createdDate = createdDate;
        this.orderNumber = orderNumber;
        this.products = products;
    }
}