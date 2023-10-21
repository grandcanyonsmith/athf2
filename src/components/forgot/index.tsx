import React from 'react';
import { IonModal, IonContent, IonItem, IonIcon } from '@ionic/react';
import { chevronBack, chevronBackSharp } from 'ionicons/icons';
import InputContainer from '../inputContainer/inputContainer';
import Button from '../button';
import ModalHeader from '../modalHeader';

interface ContainerProps {
  showModal: boolean;
  onForgotPassword: Function;
  onForgotPasswordEmail: Function;
  forgotEmail: string;
  onReset: Function;
}

const ForgotModal: React.FC<ContainerProps> = ({showModal, onForgotPassword, onReset, onForgotPasswordEmail, forgotEmail}) => {

  return (
    <IonContent>
      <IonModal isOpen={showModal}>
      <ModalHeader onAction={() => { onForgotPassword(false) }} />

        <div className="container">
        <IonItem lines="none">
          Please enter email below to reset password
        </IonItem>
        <InputContainer label={"Email"} text={forgotEmail} typekey="email" inputChange={onForgotPasswordEmail} />
        <Button text='Reset Password' onAction={()=>{onReset()}} />
        </div>
      </IonModal>
    </IonContent>
  );
};

export default ForgotModal;
