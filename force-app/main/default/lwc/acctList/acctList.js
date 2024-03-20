import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from '@salesforce/apex';
import RecordModal from 'c/recordModal'
import getTopAccounts from '@salesforce/apex/AccountController.getTopAccounts';

export default class AcctList extends LightningElement {

    accounts = [];
    results;


    @wire(getTopAccounts)
    wiredAccts(wireObj){
        this.results = wireObj;

        if(this.results.data){
            this.accounts = this.results.data;
        }else if(this.results.error){
            console.error(this.results.error)
        }
    }

    handleSelectedFromCard(event){
        console.log('event detail: ' + JSON.stringify(event.detail));
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
}