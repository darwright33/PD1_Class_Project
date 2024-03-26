import { LightningElement, api, wire } from 'lwc';
import getInterviewerSchedule from '@salesforce/apex/ReviewController.getInterviewerSchedule';
import { refreshApex } from '@salesforce/apex';
import INTERVIEW_TIME_FIELD from '@salesforce/schema/Review__c.Interview_Time__c';

export default class ScheduleInterview extends LightningElement {
    @api reviewId
    @api interviewerId 
    @api reviewName
    @api interviewerName;
    // @api reviewId = 'a03al00000307iwAAA';
    // @api reviewName = 'SF Dev I 001 - Sarah Jane Smith'
    // @api interviewerId = '005al0000005wnRAAQ';
    interviewerList = [];
    results

    fields = [INTERVIEW_TIME_FIELD]

    // Get all Interview Times for the Interviewer\
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

    recordSaved(event) {
        if(event.type == 'success'){
            refreshApex(this.results);
        }
        const sucessEvent = new CustomEvent('success', { detail: 'success'});
        this.dispatchEvent(sucessEvent);
    }

    recordCanceled() {
        const cancelEvent = new CustomEvent('canceled', { detail: 'canceled'});
        this.dispatchEvent(cancelEvent);
    }

   


}