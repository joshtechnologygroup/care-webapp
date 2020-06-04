import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ProfileDetail from 'Containers/Profile/ProfileDetail';
import ProfileDetailForm from 'Containers/Profile/ProfileDetailForm';
import ChangePassword from 'Containers/Profile/ChangePassword';

// Importing mock data: Please remove upon integration
import _ from "underscore";
import { connect } from 'react-redux';
import { getUserProfile, updateUserProfile, setUpdateProfileApiStatus } from "Actions/UserProfileAction";
import { getProfileDependencies } from '../actions/FacilitiesAction';

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
            profile: props.profile
        }
        this.setEditable = this.setEditable.bind(this);
    }
    componentDidMount(){
        if(!this.props.districtsList || !this.props.shortFacility) {
            this.props.fetchProfileDependencies();
        }
        this.props.fetchUserProfile();
    }
    componentDidUpdate(prevProps) {
        if(this.props.profile.apiSuccess) {
            alert('Successfully Updated');
            this.props.setApiStatus({
                apiSuccess: null,
                update_profile_errors: {}
            });
        }
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
        this.props.updateProfile(data);
    }
    render() {
        const { formList, isEditing } = this.state;
        const { t, profile, shortFacilityList, districtsList, userTypes } = this.props;
        return (
            <div>
                <h2 className="page-header header-container">{t('Profile')}</h2>
                <div className="page-container">
                    {
                        isEditing[formList[0]] ?
                            <ProfileDetailForm
                                districtsList={districtsList}
                                profile={profile}
                                handleSubmit={(data) => this.onSubmit(data, formList[0])}
                                editMode={true}
                                handleCancel={() => this.setEditable(formList[0], false)}
                            /> :
                            <ProfileDetail
                                shortFacilityList={shortFacilityList}
                                districtsList={districtsList}
                                userTypes={userTypes}
                                profile={profile}
                                handleEdit={() => this.setEditable(formList[0], true)}
                            />
                    }
                    <ChangePassword handleSubmit={
                        (data) => {
                            this.props.updateProfile(data)
                        }
                    } changePasswordErrors={profile.update_profile_errors} apiSuccess={profile.apiSuccess}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { profile, shortFacilities, districts, userTypes } = state
    const shortFacilityList = [];
    Object.keys(shortFacilities).map((facility, index) => {
        shortFacilityList.push(shortFacilities[facility])
    })
    return {
        profile: profile,
        shortFacilityList: shortFacilityList,
        districtsList: districts.results,
        userTypes: userTypes.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserProfile: () => {
            dispatch(getUserProfile());
        },
        fetchProfileDependencies: params => {
            dispatch(getProfileDependencies(params));
        },
        updateProfile: params => {
            dispatch(updateUserProfile(params));
        },
        setApiStatus: (data) => {
            dispatch(setUpdateProfileApiStatus(data));
        },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation() (Profile));
