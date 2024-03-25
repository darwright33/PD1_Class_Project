import { LightningElement, wire, api } from 'lwc';
import { subscribe, unsubscribe, MessageContext, publish } from "lightning/messageService";
import PositionMC from "@salesforce/messageChannel/PositionMessageChannel__c";

export default class PositionRelated extends LightningElement {

    posId;
    posName;
    subscription;
    appRecordCount = 0;

    appLabel = 'Applications (' + this.appRecordCount + ')'

    get detailLabel(){
        return 'Related records for ' + this.posName;
    }

    @wire(MessageContext)
    msgContext;

    handleAppRecordCount(event){
        this.appRecordCount = event.detail.totalRecords;
        if(this.appRecordCount == 0 || this.appRecordCount == 'undefined'){
            this.appRecordCount = 0
        }
        this.appLabel = 'Applications (' + this.appRecordCount + ')'
    }

    handleMessage(message) {
        this.posId = message.recordId;
        this.posName = message.positionName;
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.msgContext,
            PositionMC,
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