import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from '@salesforce/apex';
import { publish, MessageContext, subscribe, unsubscribe } from "lightning/messageService";
import AccountMC from "@salesforce/messageChannel/AccountMessageChannel__c";
import RecordModal from 'c/recordModal'
import getTopAccounts from '@salesforce/apex/AccountController.getTopAccounts';

export default class AcctList extends LightningElement {

    accounts = [];
    results;
    selectedId;
    selectedName;    
    subscription;

    @wire(MessageContext)
    msgContext;

    @wire(getTopAccounts)
    wiredAccts(wireObj){
        this.results = wireObj;

        if(this.results.data){
            this.accounts = this.results.data;
            this.selectedId = this.accounts[0].Id;
            this.selectedName = this.accounts[0].Name; 
            this.sendMsgService(this.selectedId, this.selectedName);
        }else if(this.results.error){
            console.error(this.results.error)
        }
    }

    handleSelectedFromCard(event){
        this.selectedId = event.detail.acctid;
        this.selectedName = event.detail.acctname;
        this.sendMsgService(this.selectedId, this.selectedName);
    }

    handleEdited(){
        // refresh AccountList if edited.
        this.refreshAcctList();
    }

    handleNewRecord(){
        RecordModal.open({
            size: 'small',
            recordId: '',
            objectApiName: 'Account',
            formMode: 'edit',
            layoutType: 'Compact',
            headerLabel: 'Create Account'
        }).then((result) => {
            if(result){
                if(result.type === 'success'){
                    const myToastEvent = new ShowToastEvent({
                        title: 'Account Created!',
                        message: 'This Acccount ' + result.detail.fields.Name.value + ' was saved successfully!',
                        variant: 'success',
                        mode: 'dismissible'
                    });
                    this.dispatchEvent(myToastEvent);   
                    this.refreshAcctList();               
                }
            }

        })
        .catch((error) => console.error(error));
    }

    refreshAcctList(){
        refreshApex(this.results);
    }

    sendMsgService(acctId, acctName){
        publish(this.msgContext, AccountMC, {recordId: acctId, accountName: acctName});
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.msgContext,
            AccountMC,
            (message) => this.handleMessage(message),
        );
    }

    handleMessage(message) {
        if(message.isEdited === 'true'){
            this.refreshAcctList();
        }
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