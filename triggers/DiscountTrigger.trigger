trigger DiscountTrigger on Discount__c (before update) {
   if (Trigger.isBefore && Trigger.isUpdate) {
       CS_DiscountTriggerService.setupNewHotDeal(Trigger.New);
   }
}