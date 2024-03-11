public with sharing class OpportunityController {
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> relatedOpps(String acctId){
        return [SELECT Id, Name, CloseDate, StageName, Amount FROM Opportunity WHERE AccountId =: acctId WITH SECURITY_ENFORCED];
    }

}