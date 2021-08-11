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
        insertProductDiscounts(discount.Id, productsIds);
    }


    private static void insertProductDiscounts(String discountId, String[] productIds) {
        List<PricebookEntry> pricebookEntries = [
                SELECT Id, UnitPrice, Product2Id
                FROM PricebookEntry
                WHERE Product2Id IN :productIds
        ];
        Discount__c discount = [
                SELECT Id, Start_Date__c, End_Date__c, Discount_Type__c, Discount_Value__c
                FROM Discount__c
                WHERE Id = :discountId
        ];
        List<ProductDiscount__c> productDiscounts = new List<ProductDiscount__c>();
        for (PricebookEntry pricebookEntry : pricebookEntries) {
            ProductDiscount__c productDiscount = new ProductDiscount__c();
            productDiscount.Discount__c = discountId;
            productDiscount.Product__c = pricebookEntry.Product2Id;
            productDiscount.Discount_Price__c = calculateDiscountPrice(discount, pricebookEntry);
            productDiscounts.add(productDiscount);
        }
        insert productDiscounts;
    }

    private static Decimal calculateDiscountPrice(Discount__c discount, PricebookEntry pricebookEntry) {
        Decimal discountPrice = 0;
        if (discount.Discount_Type__c == 'Percent') {
            discountPrice = pricebookEntry.UnitPrice - (pricebookEntry.UnitPrice * discount.Discount_Value__c / 100);
        } else {
            discountPrice = pricebookEntry.UnitPrice - discount.Discount_Value__c;
        }
        return discountPrice;
    }
}