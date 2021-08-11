public with sharing class CS_ComplaintController {

    @AuraEnabled
    public static void createCase(
            String firstName,
            String lastName,
            String email,
            String subject,
            String description,
            String reason,
            String orderId,
            String[] products) {
       CS_ComplaintService.createCase(firstName, lastName, email, subject, description, reason, orderId, products);
    }

    @AuraEnabled
    public static String checkCaseStatus(String caseNumber) {
       return CS_ComplaintService.checkCaseStatus(caseNumber);
    }

    @AuraEnabled
    public static List<Case> getCases() {
        return CS_ComplaintService.getCases();
    }

    @AuraEnabled
    public static CS_CaseWrapper getCase(String caseId) {
        return CS_ComplaintService.getCase(caseId);
    }

    @AuraEnabled
    public static List<OrderItem> getProducts(string orderId) {
        return CS_ComplaintService.getProducts(orderId);
    }
}