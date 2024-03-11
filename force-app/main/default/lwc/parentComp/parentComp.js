import { LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {

    childSpeak;


    handleFit(event){
        console.log(event)

        this.childSpeak = event.detail;
        console.log('detail: ' + JSON.stringify(event.detail));
        console.log('prop1: ' + event.detail.prop1);
    }



    // constructor
    constructor(){
        super();
        console.log('PARENT comp constructor');
    }

    // connected callback
    connectedCallback(){
        console.log('PARENT comp Connected callback');
    }

    // disconnected callback
    disconnectedCallback(){
        console.log('PARENT comp DIS Connected callback');
    }

    // renedered callback
    renderedCallback(){
        console.log('PARENT comp Rendered callback');
    }




}