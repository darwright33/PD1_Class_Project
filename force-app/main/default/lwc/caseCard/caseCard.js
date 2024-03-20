import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import RecordModal from 'c/recordModal'

export default class CaseCard extends NavigationMixin(LightningElement) {

    @api caseSubject;
    @api caseStatus
    @api casePriority;
    @api caseNumber;
    @api caseId;    

    caseTitle;

    connectedCallback(){
       this.caseTitle = 'Case# ' + this.caseNumber;
    }

    viewCase(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.caseId,
                actionName: 'view',
            },
        });
    }

    editCase(){
        RecordModal.open({
            size: 'small',
            recordId: this.caseId,
            objectApiName: 'Case',
            formMode: 'edit',
            layoutType: 'Compact',
            headerLabel: 'Edit Case'
        }).then((result) => {
            if(result){
                if(result.type === 'success'){
                    const myToastEvent = new ShowToastEvent({
                        title: 'Case Saved!',
                        message: 'The case# ' + result.detail.fields.CaseNumber.value + ' was saved successfully!',
                        variant: 'success',
                        mode: 'dismissible'
                    });
                    this.dispatchEvent(myToastEvent);
                }else if(result.type === 'error'){
                    const myToastEvent = new ShowToastEvent({
                        title: 'Error!',
                        message: 'The case# ' + result.detail.fields.CaseNumber.value + ' was not saved!',
                        variant: 'error',
                        mode: 'dismissible'
                    });
                    this.dispatchEvent(myToastEvent); 
                }
            } else{
                    const myToastEvent = new ShowToastEvent({                        
                        title: 'Something Broke!',
                        message: 'Something happened, refresh and try again!',
                        variant: 'error',
                        mode: 'dismissible'
                    });
                    this.dispatchEvent(myToastEvent);   
            }

        })
        .catch((error) => console.error(error))
    }

}