public with sharing class ApplicationsController {
    
    @AuraEnabled(cacheable=true)
    public static List<Application__c> getApplications(String posId){
        return [SELECT Id, Name, Status__c, Num_of_Reviews__c, Review_Score__c, Sum_of_Reviews__c
                FROM Application__c 
                WHERE Position__c =: posId                
                WITH SECURITY_ENFORCED
                ORDER BY Name ASC NULLS LAST];
    }

}