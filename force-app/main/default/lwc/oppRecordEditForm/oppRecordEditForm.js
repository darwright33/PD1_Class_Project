import { LightningElement, api } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import STAGE_NAME_FIELD from '@salesforce/schema/Opportunity.StageName' ;
import CLOSE_DATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import TYPE_FIELD from '@salesforce/schema/Opportunity.Type';



export default class OppRecordEditForm extends LightningElement {

    @api recordId;
    @api objectApiName;

    editMode = false;

    nameField = NAME_FIELD;
    amountField = AMOUNT_FIELD;
    stageField = STAGE_NAME_FIELD;
    closeDateField = CLOSE_DATE_FIELD;
    typeField = TYPE_FIELD;

    toggleMode(){
        this.editMode = !this.editMode;
    }



}