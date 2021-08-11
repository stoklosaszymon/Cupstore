public with sharing class CS_ResponseWrapper {
    public String status {get; set;}
    public String message {get; set;}

    public CS_ResponseWrapper(String status, String message) {
        this.status = status;
        this.message = message;
    }
}