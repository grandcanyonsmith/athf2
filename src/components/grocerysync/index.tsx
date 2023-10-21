import React from 'react';
import { IonModal, IonContent, IonItem, IonIcon } from '@ionic/react';
import { chevronBack, chevronBackSharp } from 'ionicons/icons';
import './Grocery.css';
import ModalHeader from '../modalHeader';

interface ContainerProps {
  showModal: boolean;
  handleGrocerySync: Function;
}

const GrocerySync: React.FC<ContainerProps> = ({showModal, handleGrocerySync}) => {

  return (
    <IonContent class="modal-ion-content">
      <IonModal isOpen={showModal}>
      <ModalHeader onAction={() => { handleGrocerySync(false) }} />

        <div className="spec-top-container grocery-container">
        <IonItem lines="none">
          <strong>Future grocery store sync </strong> &nbsp; (In Progress)
        </IonItem>
      </div>
      </IonModal>
    </IonContent>
  );
};

export default GrocerySync;
