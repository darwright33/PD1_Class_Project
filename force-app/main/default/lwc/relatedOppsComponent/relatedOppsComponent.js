import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { refreshApex } from '@salesforce/apex';


import relatedOpps from "@salesforce/apex/OpportunityController.relatedOpps";


const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Stage', fieldName: 'StageName'},
    { label: 'Amount', fieldName: 'Amount', type: 'currency' },
    { label: 'Closed', fieldName: 'CloseDate', type: 'date' },
];


export default class RelatedOppsComponent extends LightningElement {

    @api recordId;
    // @api objectApiName
    @api selectedId;
    @api selectedName;
    objectName = 'Opportunity'

    columns = columns;

    opps;
    loadingOpps = false;
    showOpps = false;
    showDetails = false;
    mode = 'view'
    wiredResults;

    connectedCallback(){
        this.getOpps();
    }

    // @wire(relatedOpps, { acctId: '$recordId'}) 
    // wireOppData({
    //     error,
    //     data
    // }) {
    //     this.wiredResults = data;
    //     if (data) {
    //         this.opps = data;
    //         console.log('this.opps: ' + JSON.stringify(this.opps));

    //     } else {
    //             this.error = error;
    //     }
    // }

    getOpps(){
        relatedOpps({ acctId: this.recordId })
            .then((result) => {
                this.opps = result; 
                this.showOpps = true;
                this.loadingOpps = false;   
            })
            .catch((error) => {
                this.error = error;
            })
            .finally(() => {
                this.loadingOpps = false;  
            });
    }

    handleOppEvent(event){
        if(this.selectedId == event.detail.Id){
            this.showDetails = false;
        } else {
            this.selectedId = event.detail.Id;
            this.selectedName = event.detail.Name;
            this.showDetails = true;
        }
        
    }

    recordSaved(event) {
        this.getOpps;
        if(event.type == 'success'){
            // console.log('in Success')
            this.showDetails = false;
            // refreshApex(this.opps)
            // refreshApex(this.wiredResults)
            //this.getOpps;
            this.refreshRecords()
            //window.location.reload()
        }else {
            const evt = new ShowToastEvent({
                title: 'Record not updated',
                message: reduceErrors(error).join(', '),
                variant: 'error',
            });
        }
    }

    recordCanceled() {
        this.showDetails = false;
    }

    refreshRecords(){
        refreshApex(this.opps);
    }

}