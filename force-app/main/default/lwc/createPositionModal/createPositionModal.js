import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class CreatePositionModal extends LightningModal {

    @api launchFlow;

    renderFlow = false;

    handleCancel(){
        this.close('modcancel');
    }

    handleSuccess(event){
        this.close(event);
    }

    launchFlow(){
        this.renderFlow = true;
    }
    
    handleFlow(event){
        if (event.detail.status === 'FINISHED_SCREEN') {
            // Refresh List
            this.refreshPosList();

            // Close Flow
            this.renderFlow = false;

  
        }
        else{
          console.log('Flow execution encountered an unexpected status.');
          }
        
    }

}