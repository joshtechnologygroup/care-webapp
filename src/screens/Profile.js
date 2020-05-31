import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ProfileDetail from 'Containers/Profile/ProfileDetail';
import ProfileDetailForm from 'Containers/Profile/ProfileDetailForm';
import ChangePassword from 'Containers/Profile/ChangePassword';

// Importing mock data: Please remove upon integration
import { profileDetails } from 'Mockdata/profileDetails.json';

class Profile extends Component {
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
            profile: profileDetails
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
        const { t } = this.props;
        return (
            <div>
                <h2 className="page-header header-container">{t('Profile')}</h2>
                <div className="page-container">
                    {
                        isEditing[formList[0]] ?
                            <ProfileDetailForm
                                profile={profile.contact}
                                handleSubmit={(data) => this.onSubmit(data, formList[0])}
                                editMode={true}
                            /> :
                            <ProfileDetail
                                profile={profile.contact}
                                handleEdit={() => this.setEditable(formList[0], true)}
                            />
                    }
                    <ChangePassword />
                </div>
            </div>
        );
    }
}

export default withTranslation()(Profile);
