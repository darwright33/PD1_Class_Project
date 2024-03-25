import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { subscribe, unsubscribe, MessageContext, publish } from "lightning/messageService";
import PositionMC from "@salesforce/messageChannel/PositionMessageChannel__c";
import RecordModal from 'c/recordModal'

export default class PositionDetail extends LightningElement {

    @api posId;
    posName;
    subscription = {};
    showDetail = false;
    loadingRecord = false;

    @wire(MessageContext)
    msgContext;

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

    handleMessage(message) {
        // Turn on Spinner
        this.loadingRecord = true;

        // Set message values to properties
        this.posId = message.recordId;
        this.posName = message.positionName;

        // Check for Valid record Id and turn off Spinner
        if(this.posId !== '' || this.posId !== undefined){
            this.showDetail = true;
            this.loadingRecord = false;
        }

    }

    get detailLabel(){
        return 'Details for ' + this.posName;
    }

    handleEditRecord(){
        RecordModal.open({
            size: 'small',
            recordId: this.posId,
            objectApiName: 'Position__c',
            formMode: 'edit',
            layoutType: 'Full',
            headerLabel: 'Edit Position'
        }).then((result) => {
            
            if(result){
                if(result.type === 'success'){
                    const myToastEvent = new ShowToastEvent({
                        title: 'Position Updated!',
                        message: 'This Position ' + result.detail.fields.Name.value + ' was saved successfully!',
                        variant: 'success',
                        mode: 'dismissible'
                    });
                    this.dispatchEvent(myToastEvent); 
                    this.sendMsgService();  
                    
                }
            }

        })
        .catch((error) => console.error(error));
    }

    sendMsgService(){
        publish(this.msgContext, PositionMC, {isEdited: 'true'});
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }


}