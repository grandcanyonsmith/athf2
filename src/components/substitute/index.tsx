import React from 'react';
import { IonModal, IonContent, IonItem, IonIcon } from '@ionic/react';
import { chevronBack, chevronBackSharp } from 'ionicons/icons';
import InputContainer from '../inputContainer/inputContainer';
import Button from '../button';

interface ContainerProps {
  showModal: boolean;
  addSubstitute: Function;
}

const AddFood: React.FC<ContainerProps> = ({showModal, addSubstitute}) => {

  return (
    <IonContent class="modal-ion-content">
      <IonModal isOpen={showModal}>
      <IonItem lines="none">
          <IonIcon ios={chevronBack} md={chevronBackSharp} slot="start" onClick={()=>{addSubstitute(false)}} />
        </IonItem>
        <div className="spec-top-container">
        <IonItem lines="none">
          Add a substitution
        </IonItem>
        <InputContainer label={""} text={''} typekey="addSubstitute" inputChange={()=>{}} />
        <div className="ion-modal-footer">
        <Button text='Substitute' onAction={()=>{}} />
      </div>
        </div>
      </IonModal>
    </IonContent>
  );
};

export default AddFood;
