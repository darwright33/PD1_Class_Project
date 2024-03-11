import { LightningElement, api } from 'lwc';

export default class PropExercise extends LightningElement {

    @api showDetails = false;
    @api cardTitle = 'Prop Exercise';

    showPanda(){
        this.showDetails = !this.showDetails;
    }
}