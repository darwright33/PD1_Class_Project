trigger MainInterviewTrigger on Interviewer__c (before insert, after insert, before update, after update) {
    // System.debug(' App Trigger: checkRecursive.firstcall: ' + checkRecursive.firstcall);
    // if(!checkRecursive.firstcall) {
    //     checkRecursive.firstcall = true;
    //     if(Trigger.isBefore){
    //         if(Trigger.isInsert){
    //             //System.debug('In isBefore isInsert');

    //         }

    //         if(Trigger.isUpdate){
    //             //System.debug('In isBefore isUpdate');
    //         }
    //     }

    //     if(Trigger.isAfter){
    //         if(Trigger.isInsert){
    //             //System.debug('In isAfter isInsert');
    //             InterviewerHandler.createReviewRecord(Trigger.new);
    //         }

    //         if(Trigger.isUpdate){
    //             //System.debug('In isAfter isUpdate');

    //         }
    //     }
    // }
    if(Trigger.isBefore){
        if(Trigger.isInsert){
            //System.debug('In isBefore isInsert');

        }

        if(Trigger.isUpdate){
            //System.debug('In isBefore isUpdate');
        }
    }

    if(Trigger.isAfter){
        if(Trigger.isInsert){
            //System.debug('In isAfter isInsert');
            //InterviewerHandler.createReviewRecord(Trigger.new);
            //InterviewerHandler.createReviewFromInterviewInsert(Trigger.new);
            interviewerTriggerHandler.createReviewRecordOnInterviewerInsert(trigger.new);

            
        }

        if(Trigger.isUpdate){
            //System.debug('In isAfter isUpdate');

        }
    }


}