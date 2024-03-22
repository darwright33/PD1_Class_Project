import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from '@salesforce/apex';
import { publish, MessageContext, subscribe, unsubscribe } from "lightning/messageService";
import PositionMC from "@salesforce/messageChannel/PositionMessageChannel__c";
import RecordModal from 'c/recordModal'
import getPositions from '@salesforce/apex/PositionsController.getPositions';



export default class PositionList extends LightningElement {

    results;
    selectedId;
    selectedName;    
    subscription;

    error;
    allPositions = [];
    posToDisplay = false;
    noRecordsMatch = false;
    status = 'All';
    filteredPositions = [];   
    isRefresh = false;

    comboOptions = [{label: 'All', value: 'All'},
                    {label: 'New', value: 'New'},
                    {label: 'Open', value: 'Open'}, 
                    {label: 'Closed', value: 'Closed'}
                ];

    @wire(MessageContext)
    msgContext;

    @wire(getPositions)
    wiredAccts(wireObj){
        this.results = wireObj;
        if(this.results.data){         
            this.allPositions = this.results.data.map(row => ({
                ...row,
                HiringMan: row.Hiring_Manager__r.Name
            }));
            // Check if Record was Edited in PositionDetail and only change the selectedId/Name on page load
            if(!this.isRefresh){
                this.selectedId = this.allPositions[0].Id;
                this.selectedName = this.allPositions[0].Name;
            }
             

            this.posToDisplay = true;

            this.sendMsgService(this.selectedId, this.selectedName);
            this.updatePosList();
        }else if(this.results.error){
            console.error(this.results.error)
        }
    }

    updatePosList(){
        this.filteredPositions = [];
        let currentRecord = {};       

        //console.log('this.allPositions: ' + JSON.stringify(this.allPositions))
        if(this.status === 'All'){
            this.filteredPositions = this.allPositions;
        } else {
            for(let i = 0; i < this.allPositions.length; i++){
                currentRecord = this.allPositions[i];
                if(this.status === 'Open' && currentRecord.Status__c === 'Open'){
                    this.filteredPositions.push(currentRecord);                  

                } else if(this.status === 'Closed' && currentRecord.Status__c === 'Closed'){
                    this.filteredPositions.push(currentRecord);   
                    
                } else if(this.status === 'New' && currentRecord.Status__c === 'New'){
                    this.filteredPositions.push(currentRecord); 
                    
                } 
            }
            
        }

        if(this.filteredPositions.length === 0){
            this.noRecordsMatch = true;
        } else {
            this.noRecordsMatch = false;
        }

    }

    handleComboboxChange(event){
        this.status = event.detail.value;
        this.updatePosList();
    }

    handleSelectedFromCard(event){
        this.selectedId = event.detail.Id;
        this.selectedName = event.detail.Name;
        this.sendMsgService(this.selectedId, this.selectedName);
    }

    handleEdited(){
        // refresh AccountList if edited.
        this.isRefresh = true;
        this.refreshPosList();
    }

    handleNewRecord(){
        RecordModal.open({
            size: 'small',
            recordId: '',
            objectApiName: 'Position__c',
            formMode: 'edit',
            layoutType: 'Compact',
            headerLabel: 'Create Position'
        }).then((result) => {
            if(result){
                if(result.type === 'success'){
                    const myToastEvent = new ShowToastEvent({
                        title: 'Position Created!',
                        message: 'This Position ' + result.detail.fields.Name.value + ' was saved successfully!',
                        variant: 'success',
                        mode: 'dismissible'
                    });
                    this.dispatchEvent(myToastEvent);   
                    this.refreshPosList();               
                }
            }

        })
        .catch((error) => console.error(error));
    }

    refreshPosList(){
        refreshApex(this.results);
    }

    sendMsgService(posId, posName){
        publish(this.msgContext, PositionMC, {recordId: posId, positionName: posName});
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.msgContext,
            PositionMC,
            (message) => this.handleMessage(message),
        );
    }

    handleMessage(message) {
        if(message.isEdited === 'true'){
            this.handleEdited();
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }


}