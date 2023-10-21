import React from 'react';
import { IonModal, IonContent, IonItem, IonIcon, IonButton } from '@ionic/react';
import { closeOutline, closeSharp } from 'ionicons/icons';
import './logout.css';

interface ContainerProps {
  showModal: boolean;
  handleLogout: Function;
  onLogout: Function;
}

const LogOut: React.FC<ContainerProps> = ({showModal, handleLogout, onLogout}) => {

  return (
    <IonContent class="modal-ion-content">
      <IonModal isOpen={showModal} cssClass="logout-modal">
        <>
      <IonItem lines="none">
          <IonIcon ios={closeOutline} md={closeSharp} slot="end" onClick={()=>{handleLogout(false)}} />
        </IonItem>
        <div className="logout-top-container">
        <IonItem lines="none" class="logoutinfo">
          Are you sure you want to Log Out?
        </IonItem>
        </div>
        <div className="ion-modal-footer spec-logout-footer">
          <IonButton routerLink='/login' onClick={()=>{onLogout()}} color="danger" class="round logout-action" expand="block">
              LOG OUT
          </IonButton>
        </div>
        </>
      </IonModal>
    </IonContent>
  );
};

export default LogOut;
