
public with sharing class CS_OrderListWrapper {

    @AuraEnabled
    public String id { get; set; }
    @AuraEnabled
    public List<CS_ProductWrapper> products { get; set; }
    @AuraEnabled
    public Datetime createdDate { get; set; }
    @AuraEnabled
    public Decimal total { get; set; }
    @AuraEnabled
    public String status { get; set; }
    @AuraEnabled
    public Address address { get; set; }
    @AuraEnabled
    public String orderNumber { get; set; }
    @AuraEnabled
    public Integer cases { get; set; }

    public CS_OrderListWrapper(
            String id,
            List<CS_ProductWrapper> products,
            Datetime createdDate,
            Decimal total,
            String status,
            Address address,
            String orderNumber,
            Integer cases) {
        this.id = id;
        this.products = products;
        this.createdDate = createdDate;
        this.total = total;
        this.status = status;
        this.address = address;
        this.orderNumber = orderNumber;
        this.cases = cases;
    }
}