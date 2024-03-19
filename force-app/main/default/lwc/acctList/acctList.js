import { LightningElement, wire, api } from 'lwc';
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
    }



}