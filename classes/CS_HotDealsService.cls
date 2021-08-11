public with sharing class CS_HotDealsService {

    public static CS_HotDealWrapper getHotDeal() {
        ProductDiscount__c hotDeal = [
                SELECT Product__c,
                        Product__r.Name,
                        Discount__r.Discount_Value__c,
                        Discount__r.Start_Date__c,
                        Discount__r.End_Date__c,
                        Discount__r.Amount__c
                FROM ProductDiscount__c
                WHERE Discount__r.isHotDeal__c = true
        ];
        PricebookEntry pricebookEntry = [
                SELECT UnitPrice
                FROM PricebookEntry
                WHERE Product2Id = :hotDeal.Product__r.Id
        ];
        Decimal timeLeft = (hotDeal.Discount__r.End_Date__c.getTime() - Datetime.now().getTime()) / 1000;
        AggregateResult soldCount = [
                SELECT SUM(Quantity) sold
                FROM OrderItem
                WHERE Product2.Id = :hotDeal.Product__c
        ];
        CS_HotDealWrapper wrapper = new CS_HotDealWrapper(
                hotDeal.Product__c,
                hotDeal.Product__r.Name,
                hotDeal.Discount__r.Discount_Value__c,
                CS_ProductService.getProductPrice(hotDeal.Product__r.Id),
                pricebookEntry.UnitPrice,
                hotDeal.Discount__r.Amount__c,
                100 - hotDeal.Discount__r.Amount__c,
                timeLeft
        );
        return wrapper;
    }
}