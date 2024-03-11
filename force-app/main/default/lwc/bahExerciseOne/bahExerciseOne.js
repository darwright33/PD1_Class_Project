import { LightningElement } from 'lwc';
import GenWattStyle from '@salesforce/resourceUrl/GenWattStyle'
import { loadStyle } from 'lightning/platformResourceLoader'

export default class BahExerciseOne extends LightningElement {

    firstName = 'Sarah Jane';
    lastName = 'Smith';
    jobTitle = 'Journalist';

    constructor(){
        super();
        loadStyle(this, GenWattStyle)
        .then(() => {console.log('Styling now')})
        .catch((error) => {console.log('No styles loaded error msg: ' + error)})
    }
}