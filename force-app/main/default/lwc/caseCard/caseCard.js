import { LightningElement, api } from 'lwc';

export default class CaseCard extends LightningElement {

    @api caseSubject;
    @api caseStatus
    @api casePriority;
    @api caseNumber;
    @api caseId;

}