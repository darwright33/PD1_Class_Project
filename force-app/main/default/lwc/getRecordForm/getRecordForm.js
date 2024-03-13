import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import NAME_FIELD from "@salesforce/schema/Contact.Name";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import TITLE_FIELD from "@salesforce/schema/Contact.Title";

const FIELDS = [NAME_FIELD];
const OPTIONAL_FIELDS = [EMAIL_FIELD, PHONE_FIELD, TITLE_FIELD]

export default class GetRecordForm extends LightningElement {

    @api recordId 

    // contact;
    // name;
    // email;
    // phone;
    // title;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: FIELDS,
        optionalFields: OPTIONAL_FIELDS,
    })
    contact;

    // teacher method of getter
    get name(){
        return this.contact.data.fields.Name.value
    }

    get email(){
        return this.contact.data.fields.Email.value
    }

    get phone(){
        return this.contact.data.fields.Phone.value
    }

    get title(){
        return this.contact.data.fields.Title.value
    }


    // // doc method of getter
    // get name() {
    // return getFieldValue(this.contact.data, NAME_FIELD);
    // }

    // get email() {
    // return getFieldValue(this.contact.data, EMAIL_FIELD);
    // }

    // get phone() {
    // return getFieldValue(this.contact.data, PHONE_FIELD);
    // }      

    // get title() {
    // return getFieldValue(this.contact.data, TITLE_FIELD);
    // }

    // @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
    // wiredRecord({ error, data }) {
    //     if (error) {
    //       let message = "Unknown error";
    //       if (Array.isArray(error.body)) {
    //         message = error.body.map((e) => e.message).join(", ");
    //       } else if (typeof error.body.message === "string") {
    //         message = error.body.message;
    //       }
    //       this.dispatchEvent(
    //         new ShowToastEvent({
    //           title: "Error loading contact",
    //           message,
    //           variant: "error",
    //         }),
    //       );
    //     } else if (data) {
    //         console.log('data: ' + JSON.stringify(data))
    //         this.contact = data;
    //         this.name = this.contact.fields.Name.value;
    //         // this.email = this.contact.fields.Email.value;
    //         this.phone = this.contact.fields.Phone.value;
    //         // this.title = this.contact.fields.Title.value;
    //     }
    // }

    // renderedCallback(){
    //     console.log(this.contact)
    // }

    


}