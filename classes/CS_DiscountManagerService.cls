public with sharing class CS_DiscountManagerService {

    public static void addDiscount(
            String title,
            Date startDate,
            Date endDate,
            Decimal discountValue,
            String discountType,
            String[] productsIds) {

        Discount__c discount = new Discount__c();
        discount.Name = title;
        discount.Start_Date__c = startDate;
        discount.End_Date__c = endDate;
        discount.Discount_Value__c = discountValue;
        discount.Discount_Type__c = discountType;

        insert discount;
    }

    public static void applyDiscount(String discountId, String[] productIds) {
        List<Cup__c> products = [SELECT Id, Discount__c FROM Cup__c WHERE Id IN :productIds];
        for(Cup__c cup: products) {
            cup.Discount__c = discountId;
        }
        update products;
    }
}