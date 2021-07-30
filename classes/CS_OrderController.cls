public with sharing class CS_OrderController {

    @AuraEnabled
    public static void createOrder(
            String firstName,
            String lastName,
            String email,
            String city,
            String country,
            String street,
            String phone,
            String postalCode) {

        Account account = createAccount(firstName, lastName, city, country, street, phone, postalCode);
        Contact contact = createContact(firstName, lastName, email, account.Id);
        Order order = createOrder(account.id, city, country, street, postalCode);
        insertProducts(order.Id);
    }

    private static Account createAccount(
            String firstName,
            String lastName,
            String city,
            String country,
            String street,
            String phone,
            String postalCode) {
        Account account = new Account();
        account.Name = firstName + ' ' + lastName;
        account.ShippingCity = city;
        account.ShippingCountry = country;
        account.ShippingStreet = street;
        account.Phone = phone;
        account.ShippingPostalCode = postalCode;
        insert account;
        return account;
    }

    private static Contact createContact(String firstName, String lastName, String email, String accountId) {
        Contact contact = new Contact();
        contact.FirstName = firstName;
        contact.LastName = firstName;
        contact.Email = email;
        contact.AccountId = accountId;
        insert contact;
        return contact;
    }

    private static Order createOrder(String accountId, String city, String country, String street, String postalCode) {
        Pricebook2 standardPriceBook = [
                SELECT Id, IsStandard
                FROM Pricebook2
                WHERE IsStandard = true
                LIMIT 1
        ];

        Order order = new Order();
        order.AccountId = accountId;
        order.EffectiveDate = Date.today();
        order.Status = 'Draft';
        order.Pricebook2Id = standardPriceBook.Id;
        order.ShippingCity = city;
        order.ShippingCountry = country;
        order.ShippingStreet = street;
        order.ShippingPostalCode = postalCode;
        insert order;
        return order;
    }

    private static void insertProducts(String orderId) {
        List<ShoppingCart__c> cart = [
                SELECT Product__c, Quantity__c, Price__c
                FROM ShoppingCart__c
                WHERE User__c = :UserInfo.getUserId()
        ];
        List<String> ids = new List<String>();
        for (ShoppingCart__c c : cart) {
            ids.add(c.Product__c);
        }

        List<PricebookEntry> pricebookEntries = [SELECT Id, Product2Id, Pricebook2Id FROM PricebookEntry WHERE Product2Id IN :ids];

        List<OrderItem> orderItems = new List<OrderItem>();
        for (PricebookEntry entry : pricebookEntries) {
            OrderItem item = new OrderItem();
            item.Product2Id = entry.Product2Id;
            item.Quantity = 2;
            item.UnitPrice = CS_ProductService.getProductPrice(entry.Product2Id);
            item.OrderId = orderId;
            item.PricebookEntryId = entry.Id;
            orderItems.add(item);
        }
        insert orderItems;
    }
}