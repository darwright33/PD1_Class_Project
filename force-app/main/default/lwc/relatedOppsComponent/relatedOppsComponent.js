import { LightningElement, api, wire } from 'lwc';

import relatedOpps from "@salesforce/apex/OpportunityController.relatedOpps";


const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Stage', fieldName: 'StageName'},
    { label: 'Amount', fieldName: 'Amount', type: 'currency' },
    { label: 'Closed', fieldName: 'CloseDate', type: 'date' },
];


export default class RelatedOppsComponent extends LightningElement {

    @api recordId;

    columns = columns;

    opps;
    loadingOpps = false;
    showOpps = false;

    connectedCallback(){
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
                console.log('Finally OPPPPPPS! :) ')
                this.loadingOpps = false;  
            });
    }

}