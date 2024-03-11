import { LightningElement, api } from 'lwc';

export default class SimpleGreeting extends LightningElement {

    @api greeting;
    @api firstName;

    
}