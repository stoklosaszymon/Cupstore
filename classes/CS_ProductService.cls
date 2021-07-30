public with sharing class CS_ProductService {

    public static List<PricebookEntry> getProducts() {
        return [SELECT Product2.Id, Product2.Name, UnitPrice FROM PricebookEntry];
    }

    public static List<CS_ProductListWrapper> searchProduct(String query) {
        String searchQuery = '%' + query + '%';
        List<Product2> products = [
                SELECT Name, Id
                FROM Product2
                WHERE Name LIKE :searchQuery
                AND IsActive = true
        ];
        List<CS_ProductListWrapper> wrapperList = new List<CS_ProductListWrapper>();
        for (Product2 product : products) {
            CS_ProductListWrapper wrapper = new CS_ProductListWrapper(
                    product.Id,
                    product.Name,
                    CS_ProductService.getProductPrice(product.Id)
            );
            wrapperList.add(wrapper);
        }
        return wrapperList;
    }

    public static CS_ProductWrapper getProduct(String id) {
        PricebookEntry product = [
                SELECT Product2.Name,
                       Product2.Description,
                       UnitPrice
                FROM PricebookEntry
                WHERE Product2.Id = :id
        ];
        return parseToWrapper(product);
    }

    public static List<Attachment> getProductAttachments(String id) {
        List<Attachment> attachments = [
                SELECT Id
                FROM Attachment
                WHERE ParentId = :id
        ];
        return attachments;
    }

    private static ProductDiscount__c getDiscounts(String productId) {
        List<ProductDiscount__c> discounts = [
                SELECT Discount__c
                FROM ProductDiscount__c
                WHERE Product__c = :productId
        ];
        if (discounts.size() > 0) {
            return discounts[0];
        }
        return null;
    }

    public static Decimal getProductPrice(String id) {
        PricebookEntry pricebookEntry = [
                SELECT UnitPrice
                FROM PricebookEntry
                WHERE Product2Id = :id
        ];

        ProductDiscount__c productDiscount = getDiscounts(id);

        if (productDiscount != null) {
            Discount__c discount = [
                    SELECT Start_Date__c, End_Date__c, Discount_Type__c, Discount_Value__c
                    FROM Discount__c
                    WHERE Id = :productDiscount.Discount__c
            ];

            if (DateTime.now() < discount.End_Date__c && DateTime.now() > discount.Start_Date__c) {
                if (discount.Discount_Type__c == 'Percent') {
                    return pricebookEntry.UnitPrice - (pricebookEntry.UnitPrice * discount.Discount_Value__c / 100);
                } else {
                    return pricebookEntry.UnitPrice - discount.Discount_Value__c;
                }
            }
        }
        return pricebookEntry.UnitPrice;
    }

    public static void addToCart(String productId, Integer quantity) {
        ShoppingCart__c shoppingCart = new ShoppingCart__c();

        PricebookEntry pricebookEntry = [SELECT UnitPrice FROM PricebookEntry WHERE Product2.Id = :productId];

        shoppingCart.User__c = UserInfo.getUserId();
        shoppingCart.Product__c = productId;
        shoppingCart.Quantity__c = quantity;
        shoppingCart.Selected__c = true;
        shoppingCart.Price__c = pricebookEntry.UnitPrice;
        insert shoppingCart;
    }

    public static Decimal getOverallRating(String productId) {
        AggregateResult reviews = [
                SELECT AVG(Rating__c) rating
                FROM ProductReview__c
                WHERE Product__c = :productId
        ];
        return (Decimal) reviews.get('rating');
    }

    private static List<CS_ProductWrapper> parseToWrapperList(List<PricebookEntry> products) {
        List<CS_ProductWrapper> wrapper = new List<CS_ProductWrapper>();
        for (PricebookEntry product : products) {
            wrapper.add(
                    parseToWrapper(product)
            );
        }
        return wrapper;
    }

    private static CS_ProductWrapper parseToWrapper(PricebookEntry product) {
        CS_ProductWrapper wrapper = new CS_ProductWrapper(
                product.Product2.Id,
                product.Product2.Name,
                product.Product2.Description,
                product.UnitPrice
        );
        return wrapper;
    }

    public static void addProduct(
            String name,
            String description,
            Decimal price,
            String[] images) {
        Product2 product = new Product2();
        product.Name = name;
        product.Description = description;
        product.IsActive = true;

        insert product;

        Pricebook2 standardPriceBook = [
                SELECT Id, IsStandard
                FROM Pricebook2
                WHERE IsStandard = true
                LIMIT 1
        ];

        PricebookEntry standardPriceBookEntry = new PricebookEntry(
                Pricebook2Id = standardPriceBook.Id,
                Product2Id = product.Id,
                UnitPrice = price,
                UseStandardPrice = false,
                IsActive = true
        );

        insert standardPriceBookEntry;

        insertAttachments(images, product.Id);
        runApprovalProcess(product.Id);
    }

    public static List<Product2> getUserProducts() {
        String userId = UserInfo.getUserId();
        List<Product2> products = [
                SELECT Name
                FROM Product2
                WHERE CreatedById = :userId
                AND IsActive = true
        ];
        return products;
    }

    private static void insertAttachments(String[] images, String id) {
        List<Attachment> attachments = new List<Attachment>();
        for (String image : images) {
            Attachment attachment = new Attachment();
            attachment.Body = EncodingUtil.base64Decode(image);
            Attachment.ParentId = id;
            Attachment.Name = 'file';
            attachments.add(attachment);
        }
        insert attachments;
    }

    public static List<CS_ProductListWrapper> getTopRated() {
        List<ProductReview__c> reviews = [
                SELECT Rating__c, Product__r.Id, Product__r.Name
                FROM ProductReview__c
                ORDER BY Rating__c DESC
                LIMIT 3
        ];

        List<CS_ProductListWrapper> wrapper = new List<CS_ProductListWrapper>();
        for (ProductReview__c review : reviews) {
            wrapper.add(new CS_ProductListWrapper(
                    review.Product__r.Id,
                    review.Product__r.Name,
                    CS_ProductService.getProductPrice(review.Product__r.Id)
            ));
        }

        return wrapper;
    }

    public static List<CS_ProductListWrapper> getRandomProduct() {
        Integer randomNumber = Integer.valueof((Math.random() * 6));
        List<PricebookEntry> pricebookEntries = [
                SELECT Product2Id, Product2.Name
                FROM PricebookEntry
                LIMIT 3
                OFFSET :randomNumber
        ];

        List<CS_ProductListWrapper> wrapper = new List<CS_ProductListWrapper>();
        for (PricebookEntry pricebookEntry : pricebookEntries) {
            wrapper.add(new CS_ProductListWrapper(
                    pricebookEntry.Product2Id,
                    pricebookEntry.Product2.Name,
                    CS_ProductService.getProductPrice(pricebookEntry.Product2Id)
            ));
        }

        return wrapper;
    }

    private static void runApprovalProcess(String objectId) {
        Approval.ProcessSubmitRequest req1 = new Approval.ProcessSubmitRequest();
        req1.setComments(System.Label.Email_Approval_Title);
        req1.setObjectId(objectId);
        req1.setProcessDefinitionNameOrId('New_Product_Approval');
        req1.setSkipEntryCriteria(true);
        Approval.ProcessResult result = Approval.process(req1);
    }
}