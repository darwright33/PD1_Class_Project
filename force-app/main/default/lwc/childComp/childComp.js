import { LightningElement, api } from 'lwc';

export default class ChildComp extends LightningElement {

    @api childName;
    @api age;

    childSaid = false;

    respondToParent(){

        this.childSaid = !this.childSaid;

        const myEvt = new CustomEvent('crying', { detail: {prop1: 'Hello', prop2: {firstName: 'Shane'}}});

        this.dispatchEvent(myEvt);

    }


    // constructor
    constructor(){
        super();
        console.log('child comp constructor');
    }

    // connected callback
    connectedCallback(){
        console.log('child comp Connected callback');
    }

    // disconnected callback
    disconnectedCallback(){
        console.log('child comp DIS Connected callback');
    }

    // renedered callback
    renderedCallback(){
        console.log('child comp Rendered callback');
    }

    




}