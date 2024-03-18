import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class CaseList extends LightningElement {

    @api recordId

    error;
    cases;

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Cases',
        fields: ['Case.Id', 'Case.Subject', 'Case.Status','Case.Priority','Case.CaseNumber']
    })
    listInfo({ error, data }) {
        if (data) {
            this.cases = data.records;
            this.error = undefined;
            // console.log( 'cases: ' + JSON.stringify(this.cases))
            // console.log( 'cases.fields: ' + JSON.stringify(this.cases.fields))

        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }


}