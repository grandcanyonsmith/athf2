

import React, { useState } from 'react';
import { IonToolbar, IonButtons, IonHeader, IonItem } from '@ionic/react';
import BackContainer from '../backContainer/backContainer';
import './ModalHeader.css';

interface ContainerProps {
    onAction: Function;
}

const ModalHeader: React.FC<ContainerProps> = ({onAction}) => {
  return (
    <>
      <IonHeader style={{'height': '30px', background: '#ffffff'}}>
        <IonToolbar style={{'display': 'none'}}>
            <img alt="THF Logo" className="thflogoimg" src="/assets/thflogo.png" />
        </IonToolbar>
      </IonHeader>
      <IonItem lines="none">
          <IonButtons slot="start" class="modal-back-button">
            <BackContainer name={''} isIcon={true} isBack={false} href="" onAction={onAction} />
          </IonButtons>
      </IonItem>
    </>
  );
};

export default ModalHeader;
