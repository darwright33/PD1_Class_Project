import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STATUS_FIELD from '@salesforce/schema/Case.Status';

export default class CaseList extends LightningElement {

    @api recordId

    error;
    filteredCases;
    allCases;
    status = 'All';
    noRecordsMatch = false;
    totalRecords = 0;

    comboOptions = [];

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

    // recordType Id "012000000000000AAA" is used if no custom Record Types exist.
    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: STATUS_FIELD})
    getPicklistValues({data, error}){
        if(error){
            console.error(error)
        } else if(data){
            this.comboOptions = [...data.values]
            let all = {label: 'All', value: 'All'};
            this.comboOptions.unshift(all)

            // Iteration method:
            /*
            for(let item of data.values){
                let comboOptions2 = [];
                comboOptions2.push( {label: item.label, value: item.value})
                console.log('comboOptions2: ' + JSON.stringify(comboOptions2))
            }
            */
        }
    }


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
            
            
        }
        if(this.filteredCases.length === 0){
            this.noRecordsMatch = true;
        }

        this.totalRecords = this.filteredCases.length;
        const myEvt = new CustomEvent('caserecordcount', { detail: {totalRecords: this.totalRecords }});
        this.dispatchEvent(myEvt);
    }


    




}