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

    fields = fields;

    oppRecordId = '006al0000004li7AAA'




}



// import { LightningElement, api } from 'lwc';

// export default class OppRecordForm extends LightningElement {

//     @api recordId;

//     recordFields = ['Name', 'StageName', 'Amount'];

//     recordSaved(event) {
//         console.log(event);
//     }
// }