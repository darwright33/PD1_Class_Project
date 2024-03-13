import { LightningElement, api } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ANNUAL_REVENU_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class AcctRecordEditForm extends LightningElement {

    @api recordId;
    @api objectApiName;

    editMode = false;

    nameField = NAME_FIELD;
    industryField = INDUSTRY_FIELD;
    annualRevField = ANNUAL_REVENU_FIELD;
    phoneField = PHONE_FIELD;

    toggleMode(){
        this.editMode = !this.editMode;
    }


}