import { IonButtons, IonContent, IonItem, IonButton, IonText, IonTextarea, IonFooter, IonCol, IonHeader, IonMenuToggle, IonLabel, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonCard, IonCardContent } from '@ionic/react';
import React, { useEffect } from 'react';
import { personCircleOutline, chevronForward, chevronDown, documentAttach, documentAttachOutline, close, closeSharp, chevronBack } from 'ionicons/icons';
import BackContainer from '../../components/backContainer/backContainer';
import './Version.css';
import VersionHook from '../../hooks/versionHook';
import AppHook from '../../hooks/appHook';
import { trackGAView } from '../../actions/common';

const VersionBody: React.FC = (props:any) => {

  const name = 'Version History';
  const { headerHeight } = AppHook();
  const { getVersionData, versionData, onItemSelect } = VersionHook();

  useEffect(() => {
    getVersionData();
    trackGAView('Version screen');
  }, []);

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
      </IonHeader>

      <IonContent fullscreen>
        <BackContainer name={''} />
        <IonItem lines="none" class="header-section-label">
                    <IonLabel>
                        <strong>{name}</strong>
                    </IonLabel>
                </IonItem>
        {
          versionData.map((item:any, index: number) => (                           
              <IonCard key={index}>
                <IonItem  onClick={()=>{onItemSelect(index)}}>
                  <IonLabel>{item.version}</IonLabel>
                  <IonIcon icon={item.isDisplay ? chevronDown : chevronForward} slot="end" />
                </IonItem>
                {
                  item.isDisplay &&
                  <IonCardContent class="card-item">
                  <ul>
                    {
                      item.data.map((val:any) => (
                        <li>{val}</li>
                      ))
                    }
                  </ul>
              </IonCardContent>
                }
              </IonCard>
          ))
        }
      </IonContent>
    </IonPage>
  );
};

export default VersionBody;
