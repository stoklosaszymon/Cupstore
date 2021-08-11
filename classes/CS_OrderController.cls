public with sharing class CS_OrderController {

    @AuraEnabled
    public static List<CS_OrderListWrapper> getOrders() {
        return CS_OrderService.getOrders();
    }

}