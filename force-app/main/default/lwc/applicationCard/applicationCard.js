import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from '@salesforce/apex';
import RecordModal from 'c/recordModal'
import getReviews from '@salesforce/apex/ReviewController.getReviews';
import getInterviews from '@salesforce/apex/ReviewController.getInterviews';

export default class ApplicationCard extends NavigationMixin(LightningElement) {

    @api appId;
    @api appName; 
    @api appStatus; 
    @api appNumOfReviews; 
    @api appReviewScore;

    reviewsList;
    interviewList;

    showReviews = false;
    noReviews = false;
    showInterviewSchedule = false;
    scheduleInterview = false;

    // Get reviews and show or hide them
    handleShowReviews(){
        if(this.showReviews){
            // Set showReviews to hide Reviews on Unchecking of the box. 
            this.showReviews = false;
        }else if(this.noReviews ){
            // If the box is unchecked but there are no reviews, hide the no review message
            this.noReviews = false;
            this.showReviews = false;
        }
        else {
            getReviews({appId: this.appId})
                .then((result) => {
                    // console.log(result)
                    if(result.length !== 0 || result !== undefined){
                        // If there are results, show the details
                        this.showReviews = true;
                        this.noReviews = false;
                        this.reviewsList = result;
                    }
                    if(result.length === 0 && !this.noReviews){
                        // If no results, show no Reviews Messages
                        this.showReviews = false;
                        this.noReviews = true;
                    }
                })
                .catch((error) => {
                    console.error(error)
                    this.reviewsList = undefined;
                });            
        }

    }

    handleScheduleInterviewButton(){
        this.scheduleInterview = true;
    }

    handleInterviewTimeCancel(){
        this.scheduleInterview = false;
    }

    handleInterviewTimeSuccess(){
        console.log('in handleInterviewTimeSuccess')
        // this.handleInterviewSchedule();
        // this.scheduleInterview = false;
        // this.showInterviewSchedule = false;
        window.location.reload()
    }

    handleInterviewSchedule(){
        // console.log('in handleInterviewSchedule')
        if(this.showInterviewSchedule){
            this.showInterviewSchedule = false;
        } else {
            this.showInterviewSchedule = true;
            getInterviews({appId: this.appId})
            .then((result) => {
                // console.log('result: ')
                // console.log(result)
                // console.log(typeof result)
                this.interviewList = result;
            })
            .catch((error) => {
                console.error(error)
                this.interviewList = undefined;
            });
        } 

    }
    
    viewRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.appId,
                actionName: 'view',
            },
        });
    }

    appSelected(){
        this.viewRecord();
    }

    editRecord(){
        RecordModal.open({
            size: 'small',
            recordId: this.appId,
            objectApiName: 'Application__c',
            formMode: 'edit',
            layoutType: 'Full',
            headerLabel: 'Edit Application'
        }).then((result) => {
            if(result){
                if(result.type === 'success'){
                    const myToastEvent = new ShowToastEvent({
                        title: 'Application Saved!',
                        message: 'This Application ' + result.detail.fields.Name.value + ' was saved successfully!',
                        variant: 'success',
                        mode: 'dismissible'
                    });
                    this.dispatchEvent(myToastEvent);                  
                }
            }
        })
        .catch((error) => console.error(error));
    }

}