/**
 * LWC to shows the current Applications for a selected/Passed In 
 * Application Record with an option to show the Basic Review Data
 * And check the Interview Schedule
 * @alias ApplicationCard
 * @extends NavigationMixin(LightningElement)
 * @hideconstructor
 *
 * @example
 * <c-application-card
        app-id={a.Id}
        app-name={a.Name}
        app-status={a.Status__c}
        app-num-of-reviews={a.Num_of_Reviews__c}
        app-review-score={a.Review_Score__c}
    ></c-application-card>

    @author            : Dar Wright
    Created Date       : March 20, 2024
 */
import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
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
            // Get the Review Records imperatively as needed. 
            getReviews({appId: this.appId})
                .then((result) => {
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
        // Cannot use ApexRefresh on imperative Apex Calls, so reloading the whole window due to time constraints 
        // and effort required to Refactor the entire App. 
        window.location.reload()
    }

    handleInterviewSchedule(){
        // If Interview are showing, stop showing them
        if(this.showInterviewSchedule){
            this.showInterviewSchedule = false;
        } else {
            // Show results
            this.showInterviewSchedule = true;
            // Get the Review Records imperatively as needed. 
            getInterviews({appId: this.appId})
            .then((result) => {
                this.interviewList = result;
            })
            .catch((error) => {
                console.error(error)
                this.interviewList = undefined;
            });
        } 

    }
    
    // Open the Selected Application Record
    viewRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.appId,
                actionName: 'view',
            },
        });
    }

    // Handle the click of the View Button for the Application
    appSelected(){
        this.viewRecord();
    }

    // Handle the click of the Edit Button to Edit the Application Record
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