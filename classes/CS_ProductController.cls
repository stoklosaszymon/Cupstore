public with sharing class CS_ProductController {
    @AuraEnabled
    public static List<Cup__c> getProducts() {
        return [SELECT Name, Price__c, Quantity__c FROM Cup__c];
    }

    @AuraEnabled
    public static List<Cup__c> searchProduct(String query) {
        query += '%';
        return [
                SELECT Name, Price__c, Quantity__c
                FROM Cup__c
                WHERE Name LIKE :query
        ];
    }

    @AuraEnabled
    public static Cup__c getProduct(String id) {
        return [
                SELECT Name, Price__c, Quantity__c
                FROM Cup__c
                WHERE Id = :id
        ];
    }

    @AuraEnabled
    public static List<String> getProductAttachments(String id) {
        List<String> images = new List<String>();
        List<Attachment> attachments = [
                SELECT Body
                FROM Attachment
                WHERE ParentId = :id
        ];


        for (Attachment attachment : attachments) {
            images.add(
                 attachment.Body.toString()
            );
        }

        return images;
    }
}