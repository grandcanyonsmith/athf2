import React from 'react';
import { IonItem, IonToolbar, IonButtons, IonBackButton, IonTitle, IonIcon, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import "./backContainer.css";
import { arrowBackOutline, arrowBackSharp, chevronBackOutline, chevronBackSharp, personCircleOutline, personCircleSharp } from 'ionicons/icons';
import { getTypePlatform } from '../../actions/common';

interface ContainerProps {
  name: string;
  href?: any;
  onAction?: Function;
  isBack?: any;
  isIcon?: any;
  toggleMenu?: Function;
}


const BackContainer: React.FC<ContainerProps> = ({ name, href = '/tabs/nutrition', onAction = () => { }, isBack = true, isIcon = false, toggleMenu = () => { } }) => {
  return (
    <>
      {
        isIcon ?
          getTypePlatform() ?
            <span>
              <IonIcon slot="start" color='primary' ios={chevronBackOutline} md={chevronBackSharp} class="arrow-icon-highlight-ios" onClick={() => { onAction() }} />
              <IonText color='primary' class="icon_back_handle" onClick={() => { onAction() }}>
                Back
        </IonText>
            </span> :
            <IonIcon slot="start" ios={arrowBackOutline} md={arrowBackSharp} class="arrow-icon-highlight" onClick={() => { onAction() }} />
          :
          <IonItem lines="none" class="fontSize">
            {
              isBack ?
                <IonBackButton defaultHref={href} />
                :
                <div>
                  {
                    getTypePlatform() ?
                      <span>
                        <IonIcon slot="start" color='primary' ios={chevronBackOutline} md={chevronBackSharp} class="arrow-icon-highlight-ios" onClick={() => { onAction() }} />
                        <IonText color='primary' class="icon_back_handle" onClick={() => { onAction() }}>
                          Back
                      </IonText>
                      </span> :
                      <IonIcon slot="start" ios={arrowBackOutline} md={arrowBackSharp} class="arrow-icon-highlight" onClick={() => { onAction() }} />
                  }
                </div>
            }
            <IonText class="fontBold ml-10">{name}</IonText>
            <IonIcon ios={personCircleOutline} md={personCircleSharp} slot="end" onClick={()=>{ toggleMenu(); }} />
          </IonItem>
      }
    </>
  );
};

export default BackContainer;
