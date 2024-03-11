import { LightningElement, api } from 'lwc';
import GenWattStyle from '@salesforce/resourceUrl/GenWattStyle'
import { loadStyle } from 'lightning/platformResourceLoader'

export default class HelloWorld extends LightningElement {

    @api firstName = 'Music music music!';

    constructor(){
        super();
        loadStyle(this, GenWattStyle)
        .then(() => {console.log('Style sheer loaded')})
        .catch((error) => {console.log('Error occurred: ' + error)})
    }


}