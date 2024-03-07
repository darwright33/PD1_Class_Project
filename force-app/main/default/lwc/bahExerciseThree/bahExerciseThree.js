import { LightningElement } from 'lwc';

export default class BahExerciseThree extends LightningElement {

    showOne = true;
    showTwo = false;

    accts = [
        {Id: '111', Name: 'John', AnnualRevenue: '100000'},
        {Id: '222', Name: 'Sarah Jane', AnnualRevenue: '123123456'},
        {Id: '333', Name: 'Jack', AnnualRevenue: '1230000000'}
    ];

    opps = [
        {Id: '111', Name: 'John Opp', Amount: '123456'},
        {Id: '222', Name: 'Sarah Jane Opp', Amount: '444444'},
        {Id: '333', Name: 'Jack Opp', Amount: '987654'}
    ];

    toggleSectionOne(){
        this.showOne = !this.showOne;
    }

    toggleSectionTwo(){
        this.showTwo = !this.showTwo;
    }

}