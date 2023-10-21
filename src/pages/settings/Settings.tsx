import { IonButtons, IonLabel, IonContent, IonHeader, IonIcon, IonBackButton, IonPage, IonMenuToggle, IonTitle, IonToolbar, IonItem, IonInput } from '@ionic/react';
import React, { useEffect  } from 'react';
import { personCircleOutline } from 'ionicons/icons';
import AppHook from '../../hooks/appHook';

import InputContainer from '../../components/inputContainer/inputContainer';
import SettingsHook from '../../hooks/settingsHook';
import Button from '../../components/button';
import BackContainer from '../../components/backContainer/backContainer';
import './Settings.css';
import { trackGAView } from '../../actions/common';

const Settings: React.FC = () => {
    const { settingsData, onInputChange, onSaveSettings, onPasswordAction, inputPassword, getUserData } = SettingsHook();
    const { toggleMenu } = AppHook();
    
    const name = 'Settings';
    useEffect(() => {
        getUserData();
        trackGAView('Settings screen');
    }, []);
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

            <IonContent fullscreen>
                <BackContainer name={name} toggleMenu={toggleMenu}/>
                <IonItem lines="none" class="header-section-label" style={{'display': 'none'}}>
                    <IonLabel>
                        <strong>{name}</strong>
                    </IonLabel>
                </IonItem>
                <div className="settings-spec-container">
                <InputContainer label={"Email"} isDisabled={true} text={settingsData.email} typekey="email" inputChange={onInputChange} />
                <InputContainer label={"New Password"} text={settingsData.password} typekey="password" inputType={inputPassword.password ? 'password' : 'text'} isTypePassword={true} passwordAction={onPasswordAction} inputChange={onInputChange} />
                <InputContainer label={"Confirm Password"} text={settingsData.newpassword}  typekey="newpassword" inputType={inputPassword.newpassword ? 'password' : 'text'} isTypePassword={true} passwordAction={onPasswordAction} inputChange={onInputChange} />
                <IonItem lines="none" />
          <Button text='Save Changes' onAction={()=>{onSaveSettings()}} />
          </div>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
