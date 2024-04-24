import { LightningElement, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import TASK_OBJECT from '@salesforce/schema/Task';
//import TDesc from '@salesforce/schema/Task.description';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class CForm extends LightningElement {
    accobjectApiName = ACCOUNT_OBJECT;
    accId;
    changeHandler(event){
        this.accId = event.detail.recordId;
    }
    @wire(getRelatedListRecords, {
        parentRecordId: 'accId',
        relatedListId: 'Opportunities', 
        fields: ['Opportunity.Name', 'Opportunity.AccountId.Name', 'Opportunity.CloseDate', 'Opportunity.Amount', 'Opportunity.OwnerId.Name']
    })WireOppRecords({error, data}){
        if(data){
            this.opps = data;
            this.error = undefined;
        }else{
            this.error = error;
            this.opps = undefined;
        }
    }
    
    fields = [NAME_FIELD];


    conobjectApiName = CONTACT_OBJECT;
    sal_options = [{value: '', label: '--None--'},{value: 'Mr.', label: 'Mr.'}, {value: 'Ms.', label: 'Ms.'}, {value: 'Mrs.', label: 'Mrs.'}, {value: 'Dr.', label: 'Dr.'}, {value: 'Prof.', label: 'Prof.'}, {value: 'Mx.', label: 'Mx.'}];

    oppobjectApiName = OPPORTUNITY_OBJECT;
    taskobjectApiName = TASK_OBJECT;
    Tfields = ['Task.description'];

    convoptions = [{value: 'Closed - Converted', label: 'Closed - Converted'}];

    rgoptions = [{value: 'Create New', label: 'Create New'}, {value: 'Choose Existing', label: 'Choose Existing'}];

    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
     }

    disab = false;
    donoppvalue = false;
    isChecked = false;
    donoppchange(event){
        if(event.target.checked){
            console.log("Checked");
            this.disab = true;
        }
        else{
            console.log("Checked");
            this.disab = false;
        }
    }

    // cr1(event){
    //     if(event.target.checked){
    //         document.getElementById('2').checked = false;
    //     }
    //     else{
    //         document.getElementById('2').checked = true;
    //     }
    // }

    // cr2(event){
    //     if(event.target.checked){
    //         document.getElementById('1').checked = false;
    //     }
    //     else{
    //         document.getElementById('1').checked = true;
    //     }
    // }

}

    
