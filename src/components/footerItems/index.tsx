import React from 'react'
import { IonFooter, IonImg, IonRow,  IonCol, IonButton } from '@ionic/react';
import './FooterItems.css';

function onRouteTo(history:any, path:string) {
    history.replace(path);
}

const FooterItems = ({specific='', history = {}}) => {
    return (
        <IonFooter>
                <IonRow className="footer-page">
                    <IonCol>
                        <IonButton color="light" fill="clear"
                            onClick={
                                () => {
                                    onRouteTo(history, '/tabs/nutrition');
                                }
                            }
                        >
                            <IonImg src={`/assets/nutrition${specific === 'nutrition' ? '_active': ''}.png`} />
                        </IonButton>
                    </IonCol>
                    <IonCol>
                    <IonButton color="light" fill="clear"
                    onClick={
                        () => {
                            onRouteTo(history, '/tabs/exercise');
                        }
                    }>
                        <IonImg src={`/assets/exercise${specific === 'exercise' ? '_active': ''}.png`} />
                        </IonButton>
                        </IonCol>
                    <IonCol>
                    <IonButton color="light" fill="clear"
                    onClick={
                        () => {
                            onRouteTo(history, '/tabs/goals');
                        }
                    }
                    >
                        <IonImg src={`/assets/goals${specific === 'goals' ? '_active': ''}.png`} />
                    </IonButton>
                    </IonCol>
                    <IonCol>
                    <IonButton color="light" fill="clear"
                    onClick={
                        () => {
                            onRouteTo(history, '/tabs/grocery');
                        }
                    }
                    >
                        <IonImg src={`/assets/grocery${specific === 'grocery' ? '_active': ''}.png`} />
                    </IonButton>
                    </IonCol>
                </IonRow>
            </IonFooter>
    );
};

export default FooterItems;
