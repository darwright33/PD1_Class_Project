public with sharing class PositionsController {

    @AuraEnabled(cacheable=true)
    public static List<Position__c> getPositions(){
        return [SELECT Id, Description__c, Due_Date__c, Hiring_Manager__r.Name, Name, Status__c
                FROM Position__c 
                WITH SECURITY_ENFORCED];
    }
}