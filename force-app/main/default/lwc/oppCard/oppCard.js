import { LightningElement, api } from 'lwc';
import { RefreshEvent } from 'lightning/refresh';

export default class OppCard extends LightningElement {

    @api oppName;
    @api oppStage;
    @api oppAmount;
    @api oppCloseDate;
    @api oppId;

    oppSelected(){
        const myEvt = new CustomEvent('oppselected', { detail: {Id: this.oppId, Name: this.oppName}});
        this.dispatchEvent(myEvt);
    }



}