import { LightningElement, wire, api } from 'lwc';
import { subscribe, unsubscribe, MessageContext, publish } from "lightning/messageService";
import AccountMC from "@salesforce/messageChannel/AccountMessageChannel__c";

export default class AcctRelated extends LightningElement {

    acctId;
    acctName;
    subscription;

    oppLabel = 'Opportunities';
    caseLabel = 'Cases';

    get detailLabel(){
        return 'Related records for ' + this.acctName;
    }

    @wire(MessageContext)
    msgContext;

    handleOppRecordCount(event){
        let oppRecordCount = event.detail.totalRecords;
        if(oppRecordCount == 0 || oppRecordCount == 'undefined'){
            oppRecordCount = 0
        }
        this.oppLabel = 'Opportunities (' + oppRecordCount + ')'
    }

    handleCaseRecordCount(event){
        let caseRecordCount = event.detail.totalRecords;
        if(caseRecordCount == 0 || caseRecordCount == 'undefined'){
            caseRecordCount = 0
        }
        this.caseLabel = 'Cases (' + caseRecordCount + ')'
    }

    handleMessage(message) {
        this.acctId = message.recordId;
        this.acctName = message.accountName;
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.msgContext,
            AccountMC,
            (message) => this.handleMessage(message),
        );
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

}