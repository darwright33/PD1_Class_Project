import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class CaseList extends LightningElement {

    @api recordId

    error;
    filteredCases;
    allCases;
    status = 'All';
    noRecordsMatch = false;

    comboOptions = [{label: 'All', value: 'All'},
                    {label: 'New', value: 'New'},
                    {label: 'Working', value: 'Working'}, 
                    {label: 'Escalated', value: 'Escalated'}, 
                    {label: 'Closed', value: 'Closed'}
                ]

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Cases',
        fields: ['Case.Id', 'Case.Subject', 'Case.Status','Case.Priority','Case.CaseNumber']
    })
    relatedCases(caseRecords){
        this.results = caseRecords;

        if (this.results.data) {
            this.allCases = this.results.data.records;
            this.updateCaseList();
        }

        if (this.results.error) {
            console.error('Error retrieving cases...');
            this.oppsToDisplay = false;
        }
    };

    handleComboboxChange(event){
        this.status = event.detail.value;
        this.updateCaseList();
    }

    updateCaseList(){
        this.filteredCases = [];
        let currentRecord = {};  
        this.noRecordsMatch = false;     

        if(this.status === 'All'){
            this.filteredCases = this.allCases;
        } else {
            for(let i = 0; i < this.allCases.length; i++){
                currentRecord = this.allCases[i];
                
                if(this.status === 'New' && currentRecord.fields.Status.value === 'New'){
                    this.filteredCases.push(currentRecord);                  

                } else if(this.status === 'Working' && currentRecord.fields.Status.value === 'Working'){
                    this.filteredCases.push(currentRecord);   
                    
                } else if(this.status === 'Escalated' && currentRecord.fields.Status.value === 'Escalated'){
                    this.filteredCases.push(currentRecord); 
                    
                } else if(this.status === 'Closed' && currentRecord.fields.Status.value === 'Closed'){
                    this.filteredCases.push(currentRecord); 
                    
                }
            }
            if(this.filteredCases.length === 0){
                this.noRecordsMatch = true;
            }
            
        }
    }


}