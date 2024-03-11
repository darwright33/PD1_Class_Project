import { LightningElement } from 'lwc';

import getAccounts from "@salesforce/apex/AccountController.getAccounts";
import relatedOpps from "@salesforce/apex/OpportunityController.relatedOpps";

export default class BahExerciseThree extends LightningElement {

    showOne = false;
    showTwo = false;
    loadingAccounts = false;
    loadingOpps = false;
    accts;
    opps;

    toggleSectionOne(){
        if(this.showOne){
            this.showOne = false;
            
        }else {
            this.loadingAccounts = true;
            getAccounts()
            .then((result) => {
                this.accts = result;
                this.showOne = true;     
            })
            .catch((error) => {
                this.error = error;
                this.showOne = false;
            })
            .finally(() => {
                console.log('Finally got accounts! :) ')
                this.loadingAccounts = false;  
            });
        }
        
    }

    toggleSectionTwo(){
        if(this.showTwo){
            this.showTwo = false;
            
        }else {
            this.loadingOpps = true;
            let acctId = this.accts[0].Id;
            relatedOpps({ acctId: acctId })
            .then((result) => {
                this.opps = result;
                this.showTwo = true;        
            })
            .catch((error) => {
                this.error = error;
                this.showTwo = false;
            })
            .finally(() => {
                console.log('Finally got OPPPPPPS! :) ')
                this.loadingOpps = false;  
            });
        }
    }  
}