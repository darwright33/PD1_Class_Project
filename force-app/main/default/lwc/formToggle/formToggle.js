import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FormToggle extends LightningElement {

    @api recordId;
    @api objectApiName;
    @api readOnly = false;

    connectedCallback(){
        this.readOnly = true;
    }

    editButtonClick(){
        this.readOnly = false;
    }

    handleEvent(event){
        if(event.detail == 'success'){
            this.readOnly = true;
        }else if(event.detail == 'fail') {
            const evt = new ShowToastEvent({
                title: 'Record not updated',
                message: reduceErrors(error).join(', '),
                variant: 'error',
            });
            this.dispatchEvent(evt);
        } else if(event.detail == 'canceled'){
            this.readOnly = true;
        }
    }
   

}