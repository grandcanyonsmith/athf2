import React from 'react';
import { IonHeader, IonSearchbar, IonButtons, IonLabel, IonToolbar, IonPage, IonMenuToggle, IonIcon, IonContent, IonItem, IonList } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import BackContainer from '../../components/backContainer/backContainer';
import ImpersonateHook from '../../hooks/impersonateHook';
import AppHook from '../../hooks/appHook';
import './Impersonate.css';

const Impersonate: React.FC = (props) => {
    const { headerHeight, toggleMenu } = AppHook();
    const { onUserSearch, usersResult, onUserSelect } = ImpersonateHook();
    return (
        <IonPage>
            <IonHeader style={{'height': headerHeight, background: '#ffffff'}}>
                <IonToolbar style={{'display': 'none'}}>
                <img alt="THF Logo" className="thflogoimg" src="/assets/thflogo.png" />
                <IonButtons slot="end" class="handle-menu-toggle-header">
                    <IonMenuToggle class="menu-toggle">
                        <IonIcon icon={personCircleOutline} />
                    </IonMenuToggle>
                </IonButtons>
                </IonToolbar>
                <IonToolbar style={{'marginTop': headerHeight}}>
                    <IonSearchbar onIonChange={(ev)=>{onUserSearch(ev)}} ></IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div style={{'marginTop': headerHeight === '0px' ? '50px' : '80px'}}>
                    <BackContainer name={''} toggleMenu={toggleMenu} />
                </div>
                {
                    usersResult.length === 0 &&
                    <p className='search_impersonate'>
                        Please search user to Impersonate
                    </p>
                }
                <IonList>
                    {
                        usersResult.map((item:any) => (
                            <IonItem onClick={() => {onUserSelect(item, props)}} className="user_item">
                                <IonLabel>
                                    <p>{item.firstname} {item.lastname}</p>
                                    <p>{item.email}</p>
                                </IonLabel>
                            </IonItem>
                        ))
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Impersonate;
