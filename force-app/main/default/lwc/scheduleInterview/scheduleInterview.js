/**
 * LWC to shows the current Interview Schedule for a selected/Passed In 
 * Review Record with an option to Add an Interview Time.
 * @alias ScheduleInterview
 * @extends LightningElement
 * @hideconstructor
 *
 * @example
 * <c-schedule-interview
        review-id={i.ReviewId}
        interviewer-id={i.InterviewerId}
        review-name={i.ReviewName}
        interviewer-name={i.InterviewerName}
        tabindex="0"
        oncanceled={handleInterviewTimeCancel}
        onsuccess={handleInterviewTimeSuccess}
    ></c-schedule-interview>

    @author            : Dar Wright
    Created Date       : March 26, 2024
 */

import { LightningElement, api, wire } from 'lwc';
import getInterviewerSchedule from '@salesforce/apex/ReviewController.getInterviewerSchedule';
import { refreshApex } from '@salesforce/apex';
import INTERVIEW_TIME_FIELD from '@salesforce/schema/Review__c.Interview_Time__c';

export default class ScheduleInterview extends LightningElement {
    @api reviewId
    @api interviewerId 
    @api reviewName
    @api interviewerName;

    interviewerList = [];
    results

    fields = [INTERVIEW_TIME_FIELD]

    // Get all Interview Times for the Interviewer to help see when a Free Time is available to schedule another Interview
    @wire(getInterviewerSchedule, { reviewId: "$reviewId", interviewerId: "$interviewerId"})
    wiredInterviews(wireObj){
        this.results = wireObj;
        if(this.results.data){      
            this.interviewerList = this.results.data.map(row => ({
                ...row,
                PositionName: row.Application__r.Position__r.Name,
                InterviewTime: row.Interview_Time__c,
                reviewName: row.Name
        }));
        }else if(this.results.error){
            console.error(this.results.error)
        }
    }

    // Save the Review Record 
    recordSaved(event) {
        if(event.type == 'success'){
            refreshApex(this.results);
        }
        const sucessEvent = new CustomEvent('success', { detail: 'success'});
        this.dispatchEvent(sucessEvent);
    }

    // Cancel the Edit Record
    recordCanceled() {
        const cancelEvent = new CustomEvent('canceled', { detail: 'canceled'});
        this.dispatchEvent(cancelEvent);
    }

   


}