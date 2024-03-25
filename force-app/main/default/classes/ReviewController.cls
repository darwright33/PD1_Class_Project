public with sharing class ReviewController {

    @AuraEnabled(cacheable=true)
    public static List<Review__c> getReviews(String appId){
        return [SELECT Id, Name, Business_Skills__c, Comments__c, Cultural_Fit__c, Recommend_for_Hire__c,
                        Review_Score__c, Technical_Skills__c, Interview_Time__c
                FROM Review__c 
                WHERE Application__c =: appId
                WITH SECURITY_ENFORCED];
    }
}