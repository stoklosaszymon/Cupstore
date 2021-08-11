public with sharing class CS_ComplaintService {

    public static void createCase(
            String firstName,
            String lastName,
            String email,
            String subject,
            String description,
            String reason,
            String orderId,
            String[] products) {
        Account account = findAccount(firstName, lastName);
        Contact contact = findContact(firstName, lastName, account.Id);
        Case newCase = new Case();
        newCase.Subject = subject;
        newCase.Description = description;
        if (account != null) {
            newCase.AccountId = account.Id;
        }
        if (contact != null) {
            newCase.ContactId = contact.Id;
        }
        newCase.Reason = reason;
        newCase.Origin = 'Web';
        newCase.Order__C = orderId;
        insert newCase;
        assignCaseToProduct(newCase.Id, products);
    }

    public static void assignCaseToProduct(String caseId, String[] products) {
        List<ProductCase__c> productCases = new List<ProductCase__c>();
        for(String productId: products) {
            ProductCase__c productCase = new ProductCase__c();
            productCase.Case__c = caseId;
            productCase.Product__c = productId;
            productCases.add(productCase);
        }
        insert productCases;
    }

    public static String checkCaseStatus(String caseNumber) {
        Case foundCase = [SELECT Status FROM Case WHERE CaseNumber = :caseNumber];
        return foundCase.Status;
    }

    private static Account findAccount(String firstName, String lastName) {
        String accountName = firstName + ' ' + lastName;
        List<Account> account = [SELECT Id FROM Account WHERE Name = :accountName];
        if (account.size() > 0) {
            return account[0];
        }
        return null;
    }

    private static Contact findContact(String firstName, String lastName, String accountId) {
        List<Contact> contacts = [
                SELECT Id
                FROM Contact
                WHERE AccountId = :accountId AND FirstName = :firstName AND LastName = :lastName
        ];
        if (contacts.size() > 0) {
            return contacts[0];
        }
        return null;
    }

    public static List<Case> getCases() {
        List<Case> cases = [
                SELECT Id, CreatedDate, Subject, Description, CaseNumber
                FROM Case
                WHERE OwnerId =: UserInfo.getUserId()
                ORDER BY CreatedDate DESC
        ];
        return cases;
    }

    public static CS_CaseWrapper getCase(String caseId) {
        Case caseDetails = [
                SELECT Id, Subject, Status, Description, CaseNumber, Reason, CreatedDate, Order__r.OrderNumber
                FROM Case
                WHERE Id = :caseId
        ];
        List<ProductCase__c> productCases = [SELECT Product__r.Name FROM ProductCase__c WHERE Case__c = :caseId];
        CS_CaseWrapper caseWrapper = new CS_CaseWrapper(
                caseDetails.Id,
                caseDetails.Subject,
                caseDetails.Description,
                caseDetails.CaseNumber,
                caseDetails.Reason,
                caseDetails.Status,
                caseDetails.CreatedDate,
                caseDetails.Order__r.OrderNumber,
                productCases
        );
        return caseWrapper;
    }

    public static List<OrderItem> getProducts(String orderId) {
        return [SELECT Product2.Name, Product2Id FROM OrderItem WHERE OrderId = :orderId];
    }
}