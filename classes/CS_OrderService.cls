public with sharing class CS_OrderService {

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
        Order order = addNewOrder(account.id, city, country, street, postalCode);
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
        String accountName = firstName + ' ' + lastName;
        List<Account> accounts = [SELECT Id FROM Account WHERE Name = :accountName];

        if (accounts.size() == 0) {
            Account newAccount = new Account();
            newAccount.Name = firstName + ' ' + lastName;
            newAccount.ShippingCity = city;
            newAccount.ShippingCountry = country;
            newAccount.ShippingStreet = street;
            newAccount.Phone = phone;
            newAccount.ShippingPostalCode = postalCode;
            insert newAccount;
            return newAccount;
        }
        return accounts[0];
    }

    private static Contact createContact(String firstName, String lastName, String email, String accountId) {
        List<Contact> contacts = [
                SELECT Id
                FROM Contact
                WHERE FirstName = :firstName AND LastName = :lastName
        ];
        if (contacts.size() == 0) {
            Contact contact = new Contact();
            contact.FirstName = firstName;
            contact.LastName = lastName;
            contact.Email = email;
            contact.AccountId = accountId;
            insert contact;
            return contact;
        }
        return contacts[0];
    }

    private static Order addNewOrder(String accountId, String city, String country, String street, String postalCode) {
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
        List<PricebookEntry> pricebookEntries = [
                SELECT Id, Product2Id, Pricebook2Id
                FROM PricebookEntry
                WHERE Product2Id IN :ids
        ];
        List<CartPricebookMap> mapList = new List<CartPricebookMap>();//rename
        for (Integer i = 0; i < cart.size(); i++) {
            mapList.add(
                    new CartPricebookMap(cart[i], pricebookEntries[i])
            );
        }

        List<OrderItem> orderItems = new List<OrderItem>();
        for (CartPricebookMap entry : mapList) {
            OrderItem item = new OrderItem();
            item.Product2Id = entry.pricebookEntry.Product2Id;
            item.Quantity = entry.cart.Quantity__c;
            item.UnitPrice = CS_ProductService.getProductPrice(entry.pricebookEntry.Product2Id);
            item.OrderId = orderId;
            item.PricebookEntryId = entry.pricebookEntry.Id;
            orderItems.add(item);
        }

        decreaseHotDealAmount(cart);
        insert orderItems;
    }

    public static void decreaseHotDealAmount(List<ShoppingCart__c> shoppingCart) {
        ProductDiscount__c productDiscount = [
                SELECT Discount__c, Product__c
                FROM ProductDiscount__c
                WHERE Discount__r.isHotDeal__c = true
        ];

        String hotDealDiscountId = '';
        Decimal quantity = 0;

        for (ShoppingCart__c cartItem : shoppingCart) {
            if (cartItem.Product__c == productDiscount.Product__c) {
                hotDealDiscountId = productDiscount.Discount__c;
                quantity = cartItem.Quantity__c;
            }
        }

        List<Discount__c> discount = [
                SELECT Id, Amount__c
                FROM Discount__c
                WHERE Id = :hotDealDiscountId
        ];

        if (discount.size() > 0) {
            discount[0].Amount__c -= quantity;
        }
        update discount;
    }

    class CartPricebookMap {
        public ShoppingCart__c cart { get; set; }
        public PricebookEntry pricebookEntry { get; set; }

        public CartPricebookMap(ShoppingCart__c cart, PricebookEntry pricebookEntry) {
            this.cart = cart;
            this.pricebookEntry = pricebookEntry;
        }
    }

    public static List<CS_OrderListWrapper> getOrders() {
        List<Order> orders = [
                SELECT Id, CreatedDate, GrandTotalAmount, Status, ShippingAddress, OrderNumber,
                       (SELECT Product2.Name, PricebookEntry.UnitPrice, Quantity FROM OrderItems)
                FROM Order
                WHERE Order.OwnerId = :UserInfo.getUserId()
        ];

        List<Case> cases = [
                SELECT Id, Order__c FROM Case WHERE Order__c IN :orders
        ];

        List<CS_OrderListWrapper> wrapper = new List<CS_OrderListWrapper>();
        for (Order order : orders) {
            List<CS_ProductWrapper> products = new List<CS_ProductWrapper>();
            for(OrderItem product: order.OrderItems) {
                products.add( new CS_ProductWrapper(
                        product.Product2Id,
                        product.Product2.Name,
                        product.Quantity,
                        CS_ProductService.getProductPrice(product.Product2Id)
                ));
            }

            CS_OrderListWrapper orderWrapper = new CS_OrderListWrapper(
                    order.Id,
                    products,
                    order.CreatedDate,
                    order.GrandTotalAmount,
                    order.Status,
                    order.ShippingAddress,
                    order.OrderNumber,
                    getOrderCases(orders, cases)
            );
            wrapper.add(orderWrapper);
        }
        return wrapper;
    }

    public static Integer getOrderCases(List<Order> orders, List<Case> cases) {
        Integer count = 0;
        for(Order orderObj: orders) {
            for(Case caseObj: cases) {
                if(orderObj.Id == caseObj.Order__c)  {
                    count += 1;
                }
            }
        }
        return count;
    }
}