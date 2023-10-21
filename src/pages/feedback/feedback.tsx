import { IonButtons, IonContent, IonItem, IonButton, IonText, IonTextarea, IonFooter, IonCol, IonHeader, IonMenuToggle, IonLabel, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonCard, IonCardContent } from '@ionic/react';
import React, { useEffect } from 'react';
import { personCircleOutline, mail, mailSharp, documentAttach, documentAttachOutline, close, closeSharp } from 'ionicons/icons';
import BackContainer from '../../components/backContainer/backContainer';
import './Feedback.css';
import FeedbackHook from '../../hooks/feedbackHook';
import AppHook from '../../hooks/appHook';
import { getUserEmail } from '../../actions/common';
import Button from '../../components/button';
import { trackGAView } from '../../actions/common';

const FeedbackBody: React.FC = (props:any) => {

  const name = 'Feedback';
  const { headerHeight } = AppHook();
  const { setMessage, message, onSendFeedback, onAttachImage, imagesList, onRemoveImage } = FeedbackHook();

  useEffect(() => {
    trackGAView('Feedback screen');
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
                    <IonIcon slot='end' md={documentAttach} ios={documentAttachOutline} onClick={()=>{onAttachImage()}} />
                </IonItem>
                <div className="help-spec-container">
        <IonItem>
          <IonIcon slot="start" md={mail} ios={mailSharp} />
          <IonLabel>{getUserEmail()}</IonLabel>
        </IonItem>
        <IonItem>
            <IonLabel position="stacked" class="user-message">Message</IonLabel>
            <IonTextarea rows={6} cols={20} placeholder="Enter message..." value={message} onIonChange={(e:any) => setMessage(e.detail.value!)}></IonTextarea>
          </IonItem>
          <IonGrid>
            <IonRow>
              {
                imagesList.map((item:any, index: number)=>(
                <IonCol size="6">
                  <IonCard>
                    <img src={item} />
                    <IonCardContent class="card-img-remove">
                      <IonButton size="small" fill="clear" color="danger" onClick={()=>{ onRemoveImage(index)}}>
                        <IonIcon  ios={close} md={closeSharp}  />
                        <IonText>Remove</IonText>
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                ))
              }
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
      <IonFooter class="feedback-footer">
        <Button text='Submit' onAction={()=>{ onSendFeedback(props) }} />
      </IonFooter>
    </IonPage>
  );
};

export default FeedbackBody;
