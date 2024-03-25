import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class CreatePositionModal extends LightningModal {

    @api headerLabel;

    handleCancel(){
        this.close('modcancel');
    }

    handleSuccess(event){
        this.close(event);
    }

    handleFlow(event){
        if (event.detail.status === 'FINISHED_SCREEN') {
            // // Refresh List
            // this.refreshPosList();

            // // Close Flow
            // this.renderFlow = false;

            this.close(event);
        }
        else{
          console.log('Flow execution encountered an unexpected status.');
          }
          this.close(event);
        
    }

}