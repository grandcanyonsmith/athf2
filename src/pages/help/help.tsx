import { IonButtons, IonContent, IonItem, IonFooter, IonHeader, IonMenuToggle, IonLabel, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import React, { useEffect } from 'react';
import { personCircleOutline, mailOutline, mailSharp, callOutline, callSharp, documentOutline, documentSharp, clipboardSharp, clipboardOutline, chevronForward, chevronForwardSharp, readerOutline, readerSharp } from 'ionicons/icons';
import BackContainer from '../../components/backContainer/backContainer';
import './Help.css';
import AppHook from '../../hooks/appHook';
import HelpHook from '../../hooks/helpHook';
import { trackGAView } from '../../actions/common';

const HelpBody: React.FC = (props: any) => {

  const name = 'Help';
  const { toggleMenu } = AppHook();
  const { appVersion, getCurrentAppVersion, copyText, routeToFeedback, routeToVersionHistory } = HelpHook();

  useEffect(() => {
    getCurrentAppVersion();
    trackGAView('Help screen');
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
        <BackContainer name={name} toggleMenu={toggleMenu} />
        <IonItem lines="none" class="header-section-label" style={{'display': 'none'}}>
                    <IonLabel>
                        <strong>{name}</strong>
                    </IonLabel>
                </IonItem>
                <div className="help-spec-container">
        <IonItem lines="none" class="bold">
          Contact Our Support Team
        </IonItem>
        <IonItem >
        <IonIcon slot="start" ios={mailOutline} md={mailSharp} />
          {/* <IonLabel color="success">software.support@totalhealthandfitness.com</IonLabel> */}
          <IonLabel color="success"><a className="a_link font-weight-500" href="mailto: kyle@totalhealthandfitness.com">kyle@totalhealthandfitness.com</a></IonLabel>
          <IonIcon slot="end" ios={clipboardOutline} md={clipboardSharp}
          onClick={()=>{
            copyText('kyle@totalhealthandfitness.com');
          }}
          />
        </IonItem>
        <IonItem >
          <IonIcon slot="start" ios={callOutline} md={callSharp} />
          {/* <IonLabel color="success">(801) 572 8050</IonLabel> */}
          <IonLabel color="success"><a className="a_link font-weight-500" href="tel: +1 (801) 381 4131">+1 (801) 381 4131</a></IonLabel>
          <IonIcon slot="end" ios={clipboardOutline} md={clipboardSharp} 
          onClick={()=>{
            copyText('+1 (801) 381 4131');
          }}
          />
        </IonItem>
        <IonItem onClick={()=>{
          routeToFeedback(props);
        }}>
          <IonIcon slot="start" ios={documentOutline} md={documentSharp} />
          <IonLabel>Send Feedback</IonLabel>
          <IonIcon slot="end" ios={chevronForward} md={chevronForwardSharp} />
        </IonItem>
        <IonItem onClick={()=>{
          routeToVersionHistory(props);
        }}>
          <IonIcon slot="start" ios={readerOutline} md={readerSharp} />
          <IonLabel>Version History</IonLabel>
          <IonIcon slot="end" ios={chevronForward} md={chevronForwardSharp} />
        </IonItem>
        </div>
      </IonContent>
      <IonFooter>
        <div className="app-version">{appVersion}</div>
      </IonFooter>
    </IonPage>
  );
};

export default HelpBody;
