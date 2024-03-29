import { LightningElement, api } from 'lwc';

import ACCOUNT_FIELD from '@salesforce/schema/Opportunity.Account.Name';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import STAGE_NAME_FIELD from '@salesforce/schema/Opportunity.StageName' ;
import CLOSE_DATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import TYPE_FIELD from '@salesforce/schema/Opportunity.Type';



const fields = [NAME_FIELD, ACCOUNT_FIELD, AMOUNT_FIELD, STAGE_NAME_FIELD,  CLOSE_DATE_FIELD, TYPE_FIELD];

export default class OppRecordForm extends LightningElement {

    @api recordId;
    @api objectApiName;
    @api layout = 'Compact';
    @api mode = 'view';

    fields = fields;

    recordSaved(event) {
        if(event.type == 'success'){
            const myEvt = new CustomEvent('submitted', { detail: 'success'});
            this.dispatchEvent(myEvt);
        }else {
            const myEvt = new CustomEvent('submitted', { detail: 'fail'});
            this.dispatchEvent(myEvt);
        }
    }

    recordCanceled() {
        const cancelEvent = new CustomEvent('submitted', { detail: 'canceled'});
        this.dispatchEvent(cancelEvent);
    }


}


