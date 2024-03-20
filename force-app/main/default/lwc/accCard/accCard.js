import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import RecordModal from 'c/recordModal'
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class AccCard extends NavigationMixin(LightningElement) {

    @api name;
    @api annualRevenue;
    @api phone;
    @api acctId;
    @api rank;

    showContacts = false;
    contacts;
    conError;
    noContacts = false;

    get ranking(){
        return this.rank + 1;
    }

    handleShowContacts(){
        if(this.showContacts){
            this.showContacts = false;
            this.noContacts = false;
        }else {
            getContacts({acctId: this.acctId})
            .then((result => {
                this.showContacts = true;
                this.contacts = result;
                this.conError = undefined;
                this.noContacts = false;
                if(this.isEmpty(this.contacts)){
                        this.noContacts = true;
                        console.log('this.noContacts: ' + this.noContacts);
                    }
            }))
            .catch((error => {
                this.showContacts = false;
                this.conError = error;
                this.contacts = undefined;
            }))
        }
    }

    viewAcct(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.acctId,
                actionName: 'view',
            },
        });
    }
    
    selectAcct(){
        this.dispatchEvent(new CustomEvent(
            'selected', 
            {detail: {acctid: this.acctId, acctname: this.name}}
        ));     
    }

    editAcct(){
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
                        title: 'Account Saved!',
                        message: 'The Account ' + result.detail.fields.Name.value  + ' was saved successfully!',
                        variant: 'success',
                        mode: 'dismissible'
                    });
                    this.dispatchEvent(myToastEvent);   
                    // Tell Parent Component that a record has been edited to refresh the list
                    this.dispatchEvent(new CustomEvent(
                        'edited', 
                        {detail: {acctid: this.acctId, acctname: this.name}}
                    ));               
                }
            }
        })
        .catch((error) => console.error(error));
    }

    
    

    isEmpty(obj){
        return Object.keys(obj).length === 0;
    }

}