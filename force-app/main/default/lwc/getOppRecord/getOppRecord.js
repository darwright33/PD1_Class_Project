import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import STAGE_NAME_FIELD from '@salesforce/schema/Opportunity.StageName' ;
import CLOSE_DATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import TYPE_FIELD from '@salesforce/schema/Opportunity.Type';

const FIELDS = [NAME_FIELD, AMOUNT_FIELD, STAGE_NAME_FIELD,  CLOSE_DATE_FIELD, TYPE_FIELD];

export default class GetOppRecord extends LightningElement {

    @api recordId;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: FIELDS
    })
    opp;
  
    renderedCallback(){
        if(this.opp.error){
            const evt = new ShowToastEvent({
                title: 'Data failed to load!',
                message: 'Unable to load data, refresh the page and try again.',
                variant: 'error',
              });
              this.dispatchEvent(evt);
        }
    }

    get name() {
        return getFieldValue(this.opp.data, NAME_FIELD);
    }

    get amount() {
        return getFieldValue(this.opp.data, AMOUNT_FIELD);
    }

    get stageName() {
        return getFieldValue(this.opp.data, STAGE_NAME_FIELD);
    }      

    get closeDate() {
        return getFieldValue(this.opp.data, CLOSE_DATE_FIELD);
    }

    get type() {
        return getFieldValue(this.opp.data, TYPE_FIELD);
    }



}