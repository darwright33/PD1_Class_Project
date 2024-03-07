import { LightningElement } from 'lwc';

export default class MyComponent extends LightningElement {

    showContacts = false;

    contacts = [
        {Id: '111', Name: 'John', Title: 'VP'},
        {Id: '222', Name: 'Sarah Jane', Title: 'SVP'},
        {Id: '333', Name: 'Jack', Title: 'President'}
    ];

    connectedCallback(){

        this.updateData();
    }


    updateData(){
        this.contacts.forEach(function(obj, index){
            obj.rowNum = index + 1;
        })

    }

    toggleView(){
        this.showContacts = !this.showContacts;
    }

}