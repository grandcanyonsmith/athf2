import {
    IonButtons, IonContent, IonHeader, IonMenuToggle, IonIcon, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol,
    IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonButton, IonImg
} from '@ionic/react';
import React, { useEffect } from 'react';
import { personCircleOutline, calendarOutline, calendarSharp, radioButtonOffOutline, radioButtonOffSharp, radioButtonOnOutline, radioButtonOnSharp, arrowBackOutline, arrowBackSharp } from 'ionicons/icons';
import AppHook from '../../hooks/appHook';
import BackContainer from '../../components/backContainer/backContainer';
import InputContainer from '../../components/inputContainer/inputContainer';
import ProfileHook from '../../hooks/profileHook';
import Button from '../../components/button';
import { getMaxAllowedDate } from '../../actions/common';
import { trackGAView } from '../../actions/common';


import './Profile.css';

interface StatesList {
    stateCode: string;
    stateName: number;
}

const Profile: React.FC = () => {
    const { profileData, isDisplaySelect, getstates, onInputChange, onNext, onSaveChanges, isFirstSlide, getUserData, getProfilePicture, profilePic, statesList, onErrorLoadImage } = ProfileHook();
    const name = 'Profile';
    const { isImpersonated, toggleMenu } = AppHook();
    const customActionSheetOptions = {
        header: 'Gender',
        subHeader: 'Select Gender'
    };
    const customActionSheetOptionsState = {
        header: 'State',
        subHeader: 'Select State'
    };
    useEffect(() => {
        getUserData();
        getstates();
        trackGAView('Profile screen');
    }, []);

    useEffect(() => {
        getUserData();
        trackGAView('Profile screen');
    }, [isImpersonated]);
    return (
        <IonPage>
      <IonHeader style={{'height': '30px', background: '#ffffff'}}>
        <IonToolbar style={{'display': 'none'}}>
          <img alt="THF Logo" className="thflogoimg" src="/assets/thflogo.png" />
          <IonButtons slot="end" class="handle-menu-toggle-header">
            <IonMenuToggle class="menu-toggle">
              <IonIcon icon={personCircleOutline} />
            </IonMenuToggle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

            {isFirstSlide ? <IonContent fullscreen>
                <BackContainer name={name}  toggleMenu={toggleMenu}/>
                <IonItem lines="none" class="header-section-label" style={{'display': 'none'}}>
                    <IonLabel>
                        <strong>{name}</strong>
                    </IonLabel>
                </IonItem>
                <div className="profile-main-container">
                <div>
                    <div onClick={()=>{getProfilePicture()}}>
                        {/* <IonIcon class="profile-image" ios={personCircleOutline} md={personCircleOutline} /> */}
                        <img className="profile-pic" src={profilePic} onError={()=>{onErrorLoadImage()}}/>
                        <div className="align update-photo font-weight-500" >Update Photo</div>
                        <div className="align must-be-photo">Must be under 5 MB</div>
                    </div>
                </div>
                <InputContainer label={"First Name"} text={profileData.firstName} typekey="firstName" inputChange={onInputChange} />
                <InputContainer label={"Last Name"} text={profileData.lastName} typekey="lastName" inputChange={onInputChange} />
                <IonGrid>
                    <IonRow>
                        {
                            isDisplaySelect ? <IonCol class="left-pad">
                            <IonLabel class="label-font">Gender</IonLabel>
                            <IonSelect
                                class="select-gender"
                                interfaceOptions={customActionSheetOptions}
                                interface="action-sheet"
                                placeholder="Select One"
                                onIonChange={(ev) => { onInputChange(ev.detail.value, 'gender') }}
                                selectedText={profileData.gender_selected}
                            >
                                <IonSelectOption value="m">Male</IonSelectOption>
                                <IonSelectOption value="f">Female</IonSelectOption>
                            </IonSelect>
                        </IonCol> :
                        <IonCol class="left-pad">
                            <IonLabel class="label-font">Gender</IonLabel>

                        </IonCol>
                        }
                         
                        <IonCol class="col-dob">
                            <IonLabel class="label-font">Birth Date</IonLabel>
                            <section
                                className="profile-birth-date"
                            >
                                <IonDatetime class="cls-date-time" displayFormat="MM/DD/YYYY" value={profileData.birthdate} max={getMaxAllowedDate()} onIonChange={e => onInputChange(e.detail.value, 'birthdate')}></IonDatetime>
                                <IonIcon ios={calendarOutline} md={calendarSharp} />
                            </section>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <InputContainer label={"Email"} isDisabled={true} text={profileData.email} typekey="email" inputChange={onInputChange} />

                    <Button text='Next' onAction={()=>{onNext(false)}} />
                <IonItem lines="none" class="text-center">
                    <div className="inner-items-icons">
                        <IonIcon ios={radioButtonOnOutline} md={radioButtonOnSharp} color='success' />
                        <IonIcon ios={radioButtonOffOutline} md={radioButtonOffSharp} color='success' />
                    </div>
                </IonItem>
                </div>
            </IonContent>
                :
                <IonContent>
                    <BackContainer name={''} isBack={false} href="/page/profile" onAction={()=>{onNext(true)}}/>
                    <IonItem lines="none" class="header-section-label">
                    <IonLabel>
                        <strong>{name}</strong>
                    </IonLabel>
                </IonItem>
                <div className="profile-main-container">
                    <InputContainer label={"Street Address"} text={profileData.address} typekey="address" inputChange={onInputChange} />
                    <IonGrid>
                        <IonRow>
                            <IonCol class="apt_suite">
                                <InputContainer label={"Apt/Suite"} text={profileData.aptsuite} typekey="aptsuite" inputChange={onInputChange} />
                            </IonCol>
                            <IonCol class="pad-handle-left">
                                <InputContainer label={"City"} text={profileData.city} typekey="city" inputChange={onInputChange} />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonGrid>
                        <IonRow>
                            <IonCol class="left-pad">
                                <IonLabel class="label-font">State</IonLabel>
                                <IonSelect
                                    class="select-state"
                                    interfaceOptions={customActionSheetOptionsState}
                                    interface="action-sheet"
                                    placeholder="Select One"
                                    onIonChange={(ev) => { onInputChange(ev.detail.value, 'state') }}
                                    selected-text={profileData.state}
                                >
                                    {
                                        statesList.map((item:StatesList)=>(
                                            <IonSelectOption value={item.stateCode}>{item.stateName}</IonSelectOption>
                                        ))
                                    }
                                </IonSelect>
                            </IonCol>
                            <IonCol class="zip-item">
                                <InputContainer label={"Zip"} text={profileData.postalcode} typekey="postalcode" inputChange={onInputChange} />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol class="phone-col">
                                <InputContainer label={"Phone"} text={profileData.mobilephone} typekey="mobilephone" inputChange={onInputChange} />
                            </IonCol>
                            <IonCol class="home-phone-col">
                                <InputContainer label={"Home Phone"} text={profileData.homephone} typekey="homephone" inputChange={onInputChange} />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <Button text='Save Changes' onAction={()=>{onSaveChanges()}} />
                    <IonItem lines="none" class="text-center">
                        <div className="inner-items-icons">
                            <IonIcon ios={radioButtonOffOutline} md={radioButtonOffSharp} color='success' />
                            <IonIcon ios={radioButtonOnOutline} md={radioButtonOnSharp} color='success' />
                        </div>
                    </IonItem>
                    </div>
                </IonContent>
            }
        </IonPage>
    );
};

export default Profile;
