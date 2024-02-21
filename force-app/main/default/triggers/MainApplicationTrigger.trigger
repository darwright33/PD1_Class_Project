trigger MainApplicationTrigger on Application__c  (before insert, after insert, before update, after update) {
    // System.debug(' App Trigger: checkRecursive.firstcall: ' + checkRecursive.firstcall);
    // if(!checkRecursive.firstcall) {
    //     checkRecursive.firstcall = true;
    //     if(Trigger.isBefore){
    //         if(Trigger.isInsert){
    //             System.debug('MainApplicationTrigger In isBefore isInsert');
    
    //         }
    
    //         if(Trigger.isUpdate){
    //             System.debug('MainApplicationTrigger In isBefore isUpdate');
    
    //         }
    //     }
    
    //     if(Trigger.isAfter){
    //         if(Trigger.isInsert){
    //             System.debug('MainApplicationTrigger In isAfter isInsert');
    
    //         }
    
    //         if(Trigger.isUpdate){
    //             System.debug('MainApplicationTrigger In isAfter isUpdate');
    //             ApplicationHandler.createReviewRecord(Trigger.new);
    //         }
    //     }
    // }
    // if(Trigger.isBefore){
    //     if(Trigger.isInsert){
    //         System.debug('MainApplicationTrigger In isBefore isInsert');

    //     }

    //     if(Trigger.isUpdate){
    //         System.debug('MainApplicationTrigger In isBefore isUpdate');

    //     }
    // }

    if(Trigger.isAfter){
        if(Trigger.isInsert){
            System.debug('MainApplicationTrigger In isAfter isInsert');

        }

        if(Trigger.isUpdate){
            System.debug('MainApplicationTrigger In isAfter isUpdate');
            //ApplicationHandler.createReviewRecord(Trigger.new);
            //ApplicationHandler.makeReviewFromApplicationUpdate(Trigger.new, Trigger.oldMap);
            applicationTriggerHandler.createReviewRecordOnApplicationUpdate(trigger.new, trigger.oldMap);
            
        }
    }
    
}