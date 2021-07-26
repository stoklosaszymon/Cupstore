public with sharing class CS_ProductService {

    public static List<Cup__c> getProducts() {
        return [SELECT Name, Price__c, Quantity__c FROM Cup__c];
    }

    public static List<Cup__c> searchProduct(String query) {
        String searchQuery = '%' + query + '%';
        return [
                SELECT Name, Price__c, Colors__c
                FROM Cup__c
                WHERE Name LIKE :searchQuery
        ];
    }

    public static CS_ProductWrapper getProduct(String id) {
        Cup__c cup = [
                SELECT Name, Price__c, Quantity__c, Colors__c, Description__c, Material__c, Volume__c, Short_Description__c
                FROM Cup__c
                WHERE Id = :id
        ];
        return parseToWrapper(cup);
    }

    public static List<Attachment> getProductAttachments(String id) {
        List<Attachment> attachments = [
                SELECT Id
                FROM Attachment
                WHERE ParentId = :id
        ];
        return attachments;
    }

    public static void addToCart(String productId, Integer quantity) {
        ShoppingCart__c shoppingCart = new ShoppingCart__c();
        shoppingCart.Cup__c = productId;
        shoppingCart.User__c = UserInfo.getUserId();
        shoppingCart.Quantity__c = quantity;
        shoppingCart.Selected__c = true;
        insert shoppingCart;
    }

    public static Decimal getOverallRating(String productId) {
        AggregateResult reviews = [
                SELECT AVG(Rating__c) rating
                FROM ProductReview__c
                WHERE Cup__c = :productId
        ];
        return (Decimal) reviews.get('rating');
    }

    private static List<CS_ProductWrapper> parseToWrapperList(List<Cup__c> cups) {
        List<CS_ProductWrapper> wrapper = new List<CS_ProductWrapper>();
        for (Cup__c cup : cups) {
            wrapper.add(
                    parseToWrapper(cup)
            );
        }
        return wrapper;
    }

    private static CS_ProductWrapper parseToWrapper(Cup__c cup) {
        CS_ProductWrapper wrapper = new CS_ProductWrapper(
                cup.Id,
                cup.Name,
                cup.Price__c,
                cup.Colors__c,
                cup.Description__c,
                cup.Short_Description__c,
                cup.Material__c,
                cup.Volume__c
        );
        return wrapper;
    }

    public static void addProduct(
            String name,
            String shortDescription,
            String description,
            String colors,
            String material,
            Integer volume,
            Decimal price,
            String[] images) {
        Cup__c cup = new Cup__c();
        cup.Name = name;
        cup.Short_Description__c = shortDescription;
        cup.Description__c = description;
        cup.Colors__c = colors;
        cup.Material__c = material;
        cup.Volume__c = volume;
        cup.Price__c = price;
        insert cup;

        insertAttachemnts(images, cup.Id);
        runApprovalProcess(cup.Id);
    }

    public static List<Cup__c> getUserProducts() {
        String userId = UserInfo.getUserId();
        List<CS_ProductWrapper> wrapper = new List<CS_ProductWrapper>();
        List<Cup__c> products = [
                SELECT Name, Price__c
                FROM Cup__c
                WHERE OwnerId = :userId
                AND Approval__c = 'Approved'
        ];
        return products;
    }

    private static void insertAttachemnts(String[] images, String id) {
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

    private static void runApprovalProcess(String objectId) {
        Approval.ProcessSubmitRequest req1 = new Approval.ProcessSubmitRequest();
        req1.setComments('Submitting request for approval.');
        req1.setObjectId(objectId);
        req1.setProcessDefinitionNameOrId('New_Cup_Approval');
        req1.setSkipEntryCriteria(true);
        Approval.ProcessResult result = Approval.process(req1);
    }

}