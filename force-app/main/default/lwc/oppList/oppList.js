import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class OppList extends LightningElement {

    @api recordId

    error;
    opps;

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Opportunities',
        fields: ['Opportunity.Id', 'Opportunity.Name', 'Opportunity.StageName','Opportunity.Amount','Opportunity.CloseDate','Opportunity.Type']
    })
    listInfo({ error, data }) {
        if (data) {
            this.opps = data.records;
            this.error = undefined;

        } else if (error) {
            this.error = error;
            this.opps = undefined;
        }
    }


}