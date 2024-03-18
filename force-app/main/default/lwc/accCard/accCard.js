import { LightningElement, api, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { refreshApex } from '@salesforce/apex';

export default class AccCard extends LightningElement {

    @api name;
    @api annualRevenue;
    @api phone;
    @api acctId;
    @api rank;

    showContacts = false;
    contacts;
    conError;

    get ranking(){
        return this.rank + 1;
    }

    handleSelect(){
        this.dispatchEvent(new CustomEvent(
            'selected', 
            {detail: {acctid: this.acctId, acctname: this.name}}
        ));
    }

    handleShowContacts(){
        if(this.showContacts){
            this.showContacts = false;
        }else {
            getContacts({acctId: this.acctId})
            .then((result => {
                this.showContacts = true;
                this.contacts = result;
                this.conError = undefined;
            }))
            .catch((error => {
                this.showContacts = false;
                this.conError = error;
                this.contacts = undefined;
            }))
        }
        


    }

    



}