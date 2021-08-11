public with sharing class CS_HotDealsController {

    @AuraEnabled
    public static CS_HotDealWrapper getHotDeal() {
      return CS_HotDealsService.getHotDeal();
    }

}