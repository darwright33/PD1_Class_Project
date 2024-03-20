import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { subscribe, unsubscribe, MessageContext, publish } from "lightning/messageService";
import AccountMC from "@salesforce/messageChannel/AccountMessageChannel__c";
import RecordModal from 'c/recordModal'

export default class AcctDetail extends LightningElement {

    @api acctId;
    acctName;
    subscription = {};
    showDetail = false;

    @wire(MessageContext)
    msgContext;

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

    handleMessage(message) {
        this.acctId = message.recordId;
        this.acctName = message.accountName;
        if(this.acctId !== '' || this.acctId !== undefined){
            this.showDetail = true;
        }

    }

    get detailLabel(){
        return 'Details for ' + this.acctName;
    }

    handleEditRecord(){
        RecordModal.open({
            size: 'small',
            recordId: this.acctId,
            objectApiName: 'Account',
            formMode: 'edit',
            layoutType: 'Compact',
            headerLabel: 'Edit Account'
        }).then((result) => {
            
            if(result){
                if(result.type === 'success'){
                    const myToastEvent = new ShowToastEvent({
                        title: 'Account Updated!',
                        message: 'This Acccount ' + result.detail.fields.Name.value + ' was saved successfully!',
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
        publish(this.msgContext, AccountMC, {isEdited: 'true'});
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }


}