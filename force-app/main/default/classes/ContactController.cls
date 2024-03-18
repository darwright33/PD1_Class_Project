public with sharing class ContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String acctId){
        return [SELECT Id, Name, Title, Email, AccountId 
                FROM Contact 
                WHERE AccountId =: acctId
                WITH SECURITY_ENFORCED];
    }

}