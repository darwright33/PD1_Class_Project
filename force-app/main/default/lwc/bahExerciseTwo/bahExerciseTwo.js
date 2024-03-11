import { LightningElement, wire  } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from "@salesforce/schema/Account.Name";
import ANNUAL_REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class BahExerciseTwo extends LightningElement {

    @wire(getRecord, {
        recordId: "001al000000NaKbAAK",
        fields: [NAME_FIELD, INDUSTRY_FIELD],
        optionalFields: [PHONE_FIELD, ANNUAL_REVENUE_FIELD],
      })
      account;
    
      get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
      }
    
      get phone() {
        return getFieldValue(this.account.data, PHONE_FIELD);
      }
    
      get industry() {
        return getFieldValue(this.account.data, INDUSTRY_FIELD);
      }
    
      get annualRevenue() {
        return getFieldValue(this.account.data, ANNUAL_REVENUE_FIELD);
      }


}