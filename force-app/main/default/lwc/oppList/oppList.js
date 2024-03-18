import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class OppList extends LightningElement {

    @api recordId
    

    error;
    allOpps = [];
    oppsToDisplay = false;
    status = 'All';
    filteredOpps = [];
    totalRecords = 0;
    totalAmount = 0;
    

    comboOptions = [{label: 'All', value: 'All'},
                    {label: 'Open', value: 'Open'}, 
                    {label: 'Closed', value: 'Closed'}, 
                    {label: 'Closed Won', value: 'ClosedWon'}, 
                    {label: 'Closed Lost', value: 'ClosedLost'},  
                ]

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Opportunities',
        fields: ['Opportunity.Id', 'Opportunity.Name', 'Opportunity.StageName','Opportunity.Amount',
                    'Opportunity.CloseDate','Opportunity.Type', 'Opportunity.IsClosed', 'Opportunity.IsWon']
    })
    relatedOpps(oppRecords){
        this.results = oppRecords;

        if (this.results.data) {
            this.allOpps = this.results.data.records;
            this.updateOppList();
        }

        if (this.results.error) {
            console.error('Error retrieving opportunities...');
            this.oppsToDisplay = false;
        }
    };

    handleComboboxChange(event){
        this.status = event.detail.value;
        this.updateOppList();
    }

    updateOppList(){
        this.filteredOpps = [];
        let currentRecord = {};       

        if(this.status === 'All'){
            this.filteredOpps = this.allOpps;
        } else {
            for(let i = 0; i < this.allOpps.length; i++){
                
                currentRecord = this.allOpps[i];

                if(this.status === 'Open' && !currentRecord.fields.IsClosed.value){
                    this.filteredOpps.push(currentRecord);                  

                } else if(this.status === 'Closed' && currentRecord.fields.IsClosed.value){
                    this.filteredOpps.push(currentRecord);   
                    
                } else if(this.status === 'ClosedWon' && currentRecord.fields.IsWon.value){
                    this.filteredOpps.push(currentRecord); 
                    
                } else if(this.status === 'ClosedLost' && currentRecord.fields.IsClosed.value && !currentRecord.fields.IsWon.value){
                    this.filteredOpps.push(currentRecord); 
                    
                }
            }
            
        }

        this.totalRecords = this.filteredOpps.length;
        this.totalAmount = this.filteredOpps.reduce((prev, curr) => prev + curr.fields.Amount.value, 0);

        this.oppsToDisplay = this.filteredOpps.length > 0 ? true : false;

    }
}