import React from 'react';
import { IonModal, IonContent, IonItem, IonBackButton, IonTitle, IonCard, IonCardHeader, IonPage, IonHeader, IonMenuToggle, IonButtons, IonToolbar, IonCardSubtitle, IonCardContent } from '@ionic/react';
import { chevronBack, chevronBackSharp } from 'ionicons/icons';
import InputContainer from '../inputContainer/inputContainer';
import ModalHeader from '../modalHeader';

import './Substitution.css';
interface ContainerProps {
    showModal: boolean;
    onSubstitution: Function;
    onSubstitutionChange: Function;
    filteredSubstitutionList: any;
    searchedSubstitution: string;
}

const Substitution: React.FC<ContainerProps> = ({ showModal, onSubstitution, onSubstitutionChange, filteredSubstitutionList, searchedSubstitution }) => {

    return (
        <IonModal isOpen={showModal}>
            <ModalHeader onAction={() => { onSubstitution(false) }} />

        <IonContent class="modal-ion-content">
                <div className="substituion-top-container">
                    
                    <IonItem lines="none">
                        <strong>Search Substitution</strong>
                    </IonItem>
                    <InputContainer label={""} placeholderText={"Search Substitution"} text={searchedSubstitution} typekey="addSubstitute" inputChange={onSubstitutionChange} />
                    <div className="substitution-container">
                        {
                            filteredSubstitutionList.map((item: any, i: number) => (
                                <IonCard key={i}>
                                    <IonCardHeader>
                                        <IonCardSubtitle>{item.iteName}</IonCardSubtitle>
                                        <IonCardSubtitle>{item.itemCategory}</IonCardSubtitle>
                                    </IonCardHeader>

                                    <IonCardContent class="alignText">
                                        {
                                            <ul>
                                                {item.itemContent.map((rec: any, j: number) => (
                                                    <li key={`cat_${j}`}>{rec}</li>
                                                ))}
                                            </ul>
                                        }
                                    </IonCardContent>
                                </IonCard>
                            ))
                        }
                        {
                            filteredSubstitutionList.length === 0 &&
                            <IonItem lines="none" class="no-records">
                                No Records Exists
                            </IonItem>
                        }
                    </div>
                </div>
        </IonContent>
        </IonModal>

    );
};

export default Substitution;
