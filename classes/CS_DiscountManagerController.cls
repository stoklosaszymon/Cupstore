public with sharing class CS_DiscountManagerController {
    @AuraEnabled
    public static void addDiscount(
            String title,
            Date startDate,
            Date endDate,
            Decimal discountValue,
            String discountType,
            String[] productsIds) {
        CS_DiscountManagerService.addDiscount(
                title,
                startDate,
                endDate,
                discountValue,
                discountType,
                productsIds
        );
    }
}