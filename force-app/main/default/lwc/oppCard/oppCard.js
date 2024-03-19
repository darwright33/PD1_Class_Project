import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import RecordModal from 'c/recordModal'

export default class OppCard extends NavigationMixin(LightningElement) {

    @api oppName;
    @api oppStage;
    @api oppAmount;
    @api oppCloseDate;
    @api oppId;

    viewRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.oppId,
                actionName: 'view',
            },
        });
    }

    oppSelected(){
        const myEvt = new CustomEvent('oppselected', { detail: {Id: this.oppId, Name: this.oppName}});
        this.dispatchEvent(myEvt);
        this.viewRecord();
    }

    editOpp(){
        RecordModal.open({
            size: 'small',
            recordId: this.oppId,
            objectApiName: 'Opportunity',
            formMode: 'edit',
            layoutType: 'Compact',
            headerLabel: 'Edit Opportunity'
        }).then((result) => {
            if(result){
                if(result.type === 'success'){
                    const myToastEvent = new ShowToastEvent({
                        title: 'Opportunity Saved!',
                        message: 'This opportunity ' + result.detail.fields.Name.value + ' was saved successfully!',
                        variant: 'success',
                        mode: 'dismissible'
                    });
                    this.dispatchEvent(myToastEvent);                  
                }
            }
        })
        .catch((error) => console.error(error));
    }

}