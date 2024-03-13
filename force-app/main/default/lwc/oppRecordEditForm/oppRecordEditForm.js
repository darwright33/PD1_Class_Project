import { LightningElement, api } from 'lwc';

export default class OppRecordEditForm extends LightningElement {

    @api recordId;
    @api objectApiName;

    recordSaved(event) {
        console.log(event);
    }

}