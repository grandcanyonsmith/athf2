import { IonButtons, IonContent, IonItem, IonLabel, IonHeader, IonMenuToggle, IonIcon, IonPage, IonCard, IonToolbar, IonCardContent } from '@ionic/react';
import React, { useEffect } from 'react';
import { personCircleOutline, chevronDown, chevronForward } from 'ionicons/icons';

import BackContainer from '../../components/backContainer/backContainer';
import './Privacy.css';
import AppHook from '../../hooks/appHook';
import PrivacyHook from '../../hooks/privacyHook';
import { trackGAView } from '../../actions/common';

const PrivacyBody: React.FC = () => {
    const name = 'Privacy Policy';
    const { toggleMenu } = AppHook();
    const { getPrivacyData, privacyData, onItemSelect } = PrivacyHook();

    useEffect(() => {
        getPrivacyData();
        trackGAView('Privacy screen');
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
                <div className="privacy-policy-spec-container">
                    <div className="main-content">
                        Total Health and Fitness operates totalhealthandfitness.com and may operate other websites. It is Total Health and Fitness’ policy to respect your privacy regarding any information we may collect while operating our websites.
                  </div>
                    {
                        privacyData.map((item:any, index: number) => (
                            <IonCard>
                                <IonItem onClick={() => { onItemSelect(index) }}>
                                    <IonLabel>{item.title}</IonLabel>
                                    <IonIcon icon={item.isDisplay ? chevronDown : chevronForward} slot="end" />
                                </IonItem>
                                {
                                    item.isDisplay &&
                                    <IonCardContent class="card-item">
                                            {
                                                item.data.map((val: any) => (
                                                    <div>{val}</div>
                                                ))
                                            }
                                    </IonCardContent>
                                }
                            </IonCard>
                        ))
                    }
                </div>
            </IonContent>
        </IonPage>
    );
};

export default PrivacyBody;
