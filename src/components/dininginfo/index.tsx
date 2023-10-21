import React from 'react';
import { IonModal, IonContent, IonItem, IonIcon, IonCol, IonSelect, IonSelectOption, IonDatetime, IonText, IonRow } from '@ionic/react';
import { checkmarkOutline, checkmarkSharp, chevronBack, chevronBackSharp } from 'ionicons/icons';
import Button from '../button';
import './DiningInfo.css';
import ModalHeader from '../modalHeader';

interface ContainerProps {
    showModal: boolean;
    onDiningInfo: Function;
    diningInfoSelected: any;
}

const DiningInfo: React.FC<ContainerProps> = ({ showModal, onDiningInfo, diningInfoSelected }) => {
    return (
        <IonModal isOpen={showModal}>
        <ModalHeader onAction={() => { onDiningInfo(false) }} />
<IonContent class="modal-ion-content">


                <div className="spec-top-container padding-main dining-info-container">
                <IonItem lines="none">
                    <IonText>
                        <strong>Dining Out Guide</strong>
                    </IonText>
                </IonItem>
                {diningInfoSelected.restaurant.content.length > 0 && <div>
                    <IonItem lines="none">
                        <strong>{diningInfoSelected.restaurant.contentName}</strong>
                    </IonItem>
                    {
                        diningInfoSelected.restaurant.content.map((item:any) => (
                            <IonRow class="spec-row-rec">
                                <IonCol size="3" class="align-right">
                                    <strong>{item.itemName}</strong>
                                </IonCol>
                                <IonCol class="align-left">
                                    {item.itemContent}
                                </IonCol>
                            </IonRow>
                        ))
                    }
                </div>}
                { diningInfoSelected.cuisine.content.length > 0 &&<div>
                    <IonItem lines="none">
                        <strong>Dining Out Tips:</strong>
                    </IonItem>
                    {
                        diningInfoSelected.cuisine.content.map((item:any) => (
                            <IonItem lines="none">
                                <IonIcon color="success" slot="start" md={checkmarkSharp} ios={checkmarkOutline} />
                                {item}
                            </IonItem>
                        ))
                    }
                </div>
                }
                </div>
                <div className="ion-modal-footer">
                    <Button text='OK' onAction={() => { onDiningInfo(false) }} />
                </div>
        </IonContent>
        </IonModal> 
    )
};

export default DiningInfo;
