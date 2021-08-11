public with sharing class CS_DiscountTriggerService {

    public static void setupNewHotDeal(List<Discount__c> discounts) {
        Integer productCount = [SELECT Count() FROM Product2];
        Integer randomIndex = Integer.valueof((Math.random() * productCount));
        Product2 randomProduct = [SELECT Id FROM Product2 LIMIT 1 OFFSET :randomIndex];

        ProductDiscount__c productDiscount = new ProductDiscount__c();
        ProductDiscount__c pd = [
                SELECT Id, Product__c
                FROM ProductDiscount__c
                WHERE Discount__c IN :discounts
        ];
        for (Discount__c discount : discounts) {
            productDiscount.Product__c = pd.Product__c;
            productDiscount.Discount__c = discount.Id;
            if (discount.Amount__c <= 0 && discount.isHotDeal__c == true) {
                discount.Amount__c = 100;
                discount.Start_Date__c = Datetime.now();
                discount.End_Date__c = Datetime.now().addDays(1);
                discount.Discount_Value__c = Integer.valueOf((Math.random() * 50));
                productDiscount.Product__c = randomProduct.Id;
            }
        }

        delete pd;
        insert productDiscount;
    }
}