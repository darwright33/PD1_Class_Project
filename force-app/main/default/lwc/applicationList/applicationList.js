import { LightningElement, wire, api } from 'lwc';
import getApplications from '@salesforce/apex/ApplicationsController.getApplications';
import getReviews from '@salesforce/apex/ReviewController.getReviews';


export default class ApplicationList extends LightningElement {

    @api posId
    
    error;
    allApps = [];
    appsToDisplay = false;
    noRecordsMatch = false;
    status = 'All';
    filteredApps = [];
    totalRecords = 0;
    // showInterviewSchedule = false;
    // reviewsList;
    // showScheduleInterview = false;
     

    comboOptions = [{label: 'All', value: 'All'},
                    {label: 'Applied', value: 'Applied'}, 
                    {label: 'Interviewing', value: 'Interviewing'}, 
                    {label: 'Rejected', value: 'Rejected'}, 
                    {label: 'Withdrawn', value: 'Withdrawn'},  
                    {label: 'Offered', value: 'Offered'}, 
                    {label: 'Accepted', value: 'Accepted'},  
                ]

    @wire(getApplications,{ posId: '$posId'})
    relatedApps(appRecords){
        this.results = appRecords;
        if (this.results.data) {
            this.allApps = this.results.data;
            this.updateAppList();
        }

        if (this.results.error) {
            console.error('Error retrieving applications...' + this.results.error);
            this.appsToDisplay = false;
        }
    };

    handleComboboxChange(event){
        this.status = event.detail.value;
        this.updateAppList();
    }

    handleSelectedFromCard(event){
        console.log('event detail: ' + JSON.stringify(event.detail));

    }

    updateAppList(){
        this.filteredApps = [];
        let currentRecord = {};       

        // Reset the no Records Message when the List is updated
        this.noRecordsMatch = false;

        if(this.status === 'All'){
            this.filteredApps = this.allApps;
        } else {
            for(let i = 0; i < this.allApps.length; i++){
                
                currentRecord = this.allApps[i];

                if(this.status === 'Applied' && currentRecord.Status__c === 'Applied'){
                    this.filteredApps.push(currentRecord);
                } else if(this.status === 'Interviewing' && currentRecord.Status__c === 'Interviewing'){
                    this.filteredApps.push(currentRecord);  
                } else if(this.status === 'Rejected' && currentRecord.Status__c === 'Rejected'){
                    this.filteredApps.push(currentRecord);                     
                } else if(this.status === 'Withdrawn' && currentRecord.Status__c === 'Withdrawn'){
                    this.filteredApps.push(currentRecord);   
                } else if(this.status === 'Offered' && currentRecord.Status__c === 'Offered'){
                    this.filteredApps.push(currentRecord); 
                } else if(this.status === 'Accepted' && currentRecord.Status__c === 'Accepted'){
                    this.filteredApps.push(currentRecord);   
                }
            }
            
        }

        if(this.filteredApps.length === 0){
            this.noRecordsMatch = true;
        }

        this.totalRecords = this.filteredApps.length;

        this.appsToDisplay = this.filteredApps.length > 0 ? true : false;

        const myEvt = new CustomEvent('apprecordcount', { detail: {totalRecords: this.totalRecords}});
        this.dispatchEvent(myEvt);

    }

    // handleInterviewSchedule(){
    //     if(this.showInterviewSchedule){
    //         this.showInterviewSchedule = false;
    //     }else {
    //         getReviews({appId: this.appId})
    //         .then((result) => {
    //             console.log(result)
    //             if(result.length !== 0 || result !== undefined){
    //                 // If there are results, show the details
    //                 this.reviewsList = result;
    //             }
            
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             this.reviewsList = undefined;
    //         });
    //     }
        
    // }
    
}



