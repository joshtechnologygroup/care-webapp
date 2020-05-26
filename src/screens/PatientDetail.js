import React, { Component } from 'react';
import i18n from "i18next";
import PersonalDetail from 'Components/Cards/PersonalDetail';
import PersonalDetailForm from 'Components/Forms/PersonalDetail';
import ContactDetail from 'Components/Cards/ContactDetail';

class PatientDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formList: [
                'personal',
                'contact',
            ],
            isEditing: {
                personal: false,
                contact: false
            },
            profile: {
                personal: {
                    firstName: 'John',
                    lastName: 'Doe',
                    image: undefined,
                    imageSrc: undefined,
                    idICMR: 'Cx42153799',
                    idGovt: '4245 67778 2828 2524',
                    gender: 'Male',
                    ageMonths: 3,
                    ageYears: 22,
                    clusterGroup: 'A'
                },
                contact: {
                    number: '9876543210',
                    numberBelongsTo: 'Self',
                    address: 'Hno: 15, Street 3, Industrial Area',
                    municipalWard: 'Kalimpong',
                    city: 'Kolkata',
                    district: 'Kalimpong',
                    state: 'West Bengal',
                    pincode: '665144',
                    nativeState: 'West Bengal',
                    nativeCountry: 'India'
                }
            }
        }
        this.setEditable = this.setEditable.bind(this);
    }
    setEditable = (key, value) => {
        this.setState({
            isEditing: {
                ...this.state.isEditing,
                [key]: value
            }
        });
        console.log(this.state)
    }
    onSubmit = (data, key) => {
        console.log("submit", key, data);
        this.setState({
            profile: {
                ...this.state.profile,
                [key]: data
            },
            isEditing: {
                ...this.state.isEditing,
                [key]: false
            }
        })
    }
    render() {
        const { formList, isEditing, profile } = this.state;
        return (
            <div>
                <h2 className="page-header header-container">{i18n.t('Patient Detail')}</h2>
                <div className="page-container">
                    {
                        isEditing[formList[0]] ? 
                        <PersonalDetailForm
                            profile={profile.personal}
                            handleSubmit={ (data) => this.onSubmit(data, formList[0]) }
                            editMode={true}
                        /> :
                        <PersonalDetail profile={profile.personal} handleEdit={ () => this.setEditable(formList[0], true) } />
                    }
                    {
                        isEditing[formList[1]] ?
                        <h1>I too am being edited</h1> :
                        <ContactDetail profile={profile.contact} handleEdit={ () => this.setEditable(formList[1], true) } />
                    }
                </div>
            </div>
        );
    }
}

export default PatientDetail;
