import React from 'react';
import { IonModal, IonContent, IonItem, IonIcon, IonGrid, IonRow, IonCol, IonDatetime, IonTextarea } from '@ionic/react';
import { chevronBack, chevronBackSharp } from 'ionicons/icons';
import './AddNotes.css';
import Button from '../button';
import ModalHeader from '../modalHeader';


interface ContainerProps {
    showModal: boolean;
    addNotes: Function;
    selectedDate: any;
    onNotesChange: Function;
    notes:string;
    onSaveNotes: Function;
    selectedwaternote: string;
}

const AddNotes: React.FC<ContainerProps> = ({ showModal, addNotes, selectedDate, onNotesChange, notes, onSaveNotes, selectedwaternote }) => {

    return (
        <IonModal isOpen={showModal}>
        <ModalHeader onAction={() => { addNotes(false) }} />
        <IonContent class="modal-ion-content">

                <div className="spec-top-container notes-spec-container">
                    <IonGrid>
                        <IonRow>
                            <IonCol class="fontSize">
                                <IonItem lines="none">

                                    Notes
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem class="dateItem" lines="none">
                                    {
                                        selectedDate &&
                                        <IonDatetime displayFormat="DDD MMM DD" disabled placeholder="Select Date" value={selectedDate} ></IonDatetime>
                                    }
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonItem lines="none">
                        <IonTextarea class="cls-textarea" rows={5} value={notes} placeholder="Type here..." onIonChange={e=>{onNotesChange(e.detail.value)}}></IonTextarea>
                    </IonItem>
                    <div className="cls-padding specific-note">
                        {selectedwaternote}
                    </div>
                </div>
                
                <div className="ion-modal-footer">
                        <Button text='Save' onAction={() => { onSaveNotes() }} />
                    </div>
        </IonContent>
        </IonModal>

    );
};

export default AddNotes;
