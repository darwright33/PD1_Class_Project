import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class PositionCard extends NavigationMixin(LightningElement) {


    @api posName
    @api posDescription
    @api posDueDate
    @api posHiringManager
    @api posStatus
    @api posId

    posSelected(){
        const myEvt = new CustomEvent('posselected', { detail: {Id: this.posId, Name: this.posName}});
        this.dispatchEvent(myEvt);        
    }

    viewRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.posId,
                actionName: 'view',
            },
        });
    }

}