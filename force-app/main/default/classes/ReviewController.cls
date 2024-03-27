/*
*********************************************************
Apex Class Name    : ReviewController
Created Date       : March 20, 2024
@description       : This is class is used for Sending Review Object data to LWCs
@author            : Dar Wright
Modification Log:
Ver   Date         Author                               Modification
1.0   03-27-2024   Dar Wright                      Initial Version
*********************************************************
*/
public with sharing class ReviewController {

    /*
    *********************************************************
    @Method Name    : getReviews
    @author         : Dar Wright
    @description    : Send Review records to LWC that are related to an Application Record
    @param          : The Application Record Id - appId
    @return         : List<Review__c> 
    ********************************************************
    */
    @AuraEnabled(cacheable=true)
    public static List<Review__c> getReviews(String appId){
        return [SELECT Id, Name, Business_Skills__c, Comments__c, Cultural_Fit__c, Recommend_for_Hire__c,
                        Review_Score__c, Technical_Skills__c, Interview_Time__c
                FROM Review__c 
                WHERE Application__c =: appId
                WITH SECURITY_ENFORCED];
    }

    /*
    *********************************************************
    @Method Name    : getInterviews
    @author         : Dar Wright
    @description    : Send ReviewWrapper records to LWC that are related to an Application Record
    @param          : The Application Record Id - appId
    @return         : List<ReviewWrapper>
    ********************************************************
    */
    @AuraEnabled(cacheable=true)
    public static List<ReviewWrapper> getInterviews(String appId){
        List<Review__c> reviewList = [SELECT Id, Name, Interviewer__r.Interviewer__r.Name, 
                                        Interviewer__r.Position__r.Name, Interview_Time__c
                                        FROM Review__c 
                                        WHERE Application__c =: appId
                                        WITH SECURITY_ENFORCED];

        List<ReviewWrapper> wrapList = new List<ReviewWrapper>();

        if(!reviewList.isEmpty()){
            for(Review__c rev : reviewList){
                wrapList.add(new ReviewWrapper(rev));
            }
        }

        return wrapList;
    }

    /*
    *********************************************************
    @Method Name    : getInterviewerSchedule
    @author         : Dar Wright
    @description    : Send Review records for Specified Interviewer
    @param          : The Interview Record Id - interviewerId
    @return         : List<Review__c>
    ********************************************************
    */
    @AuraEnabled(cacheable=true)
    public static List<Review__c> getInterviewerSchedule(String interviewerId){
        return [SELECT Id, Name, Interview_Time__c, Application__r.Position__r.Name
                    FROM Review__c
                    WHERE Interviewer__r.Interviewer__r.Id = :interviewerId
                    AND (Interview_Time__c = NEXT_N_DAYS:11
                    OR Interview_Time__c = NULL)
                    WITH SECURITY_ENFORCED
                    ORDER BY Interview_Time__c ASC];
    }

    /*
    *********************************************************
    @Method Name    : ReviewWrapper
    @author         : Dar Wright
    @description    : Flattens Data down to one level for LWC
    @param          : 
    @return         : 
    ********************************************************
    */
    public class ReviewWrapper{
        @AuraEnabled public Review__c revRecord{get;set;}
        @AuraEnabled public String InterviewerName {get; set;}
        @AuraEnabled public String ReviewId {get; set;}
        @AuraEnabled public String ReviewName {get; set;}
        @AuraEnabled public String InterviewerId {get; set;}
        @AuraEnabled public DateTime InterviewTime {get; set;}
        @AuraEnabled public Boolean showInterviewButton {get; set;}

        public ReviewWrapper(Review__c revRecord){
            this.revRecord = revRecord;
            this.InterviewerName = revRecord.Interviewer__r.Interviewer__r.Name;
            this.ReviewId = revRecord.Id;
            this.ReviewName = revRecord.Name;
            this.InterviewerId = revRecord.Interviewer__r.Interviewer__r.Id;
            this.InterviewTime = revRecord.Interview_Time__c;
            if(revRecord.Interview_Time__c != NULL ){
                this.showInterviewButton = false;
            } else {
                this.showInterviewButton = true;
            }
            
        }
    }

}