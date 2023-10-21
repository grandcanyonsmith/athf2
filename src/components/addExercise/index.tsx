import React from 'react';
import { IonModal, IonProgressBar, IonFooter, IonContent, IonItem, IonIcon, IonThumbnail, IonLabel, IonVirtualScroll } from '@ionic/react';
import { chevronBack, chevronBackSharp, addSharp } from 'ionicons/icons';
import InputContainer from '../inputContainer/inputContainer';
import Button from '../button';
import './Exercise.css';
import ModalHeader from '../modalHeader';

interface ContainerProps {
  showModal: boolean;
  addExercise: Function;
  onSearchExercise: Function;
  searchExercise?:any;
  exerciseData?: any;
  onSelectExerciseItem: Function;
  selectedExercise?: any;
  onAddExerciseNew: Function;
  isNoRecordsExercise: boolean;
  isDisplayExerciseLoader: boolean;
}

const AddExercise: React.FC<ContainerProps> = ({showModal, addExercise, onSearchExercise, searchExercise, exerciseData, onSelectExerciseItem, isDisplayExerciseLoader, onAddExerciseNew, selectedExercise = {}, isNoRecordsExercise}) => {

  return (
    <IonModal isOpen={showModal}>
      <ModalHeader onAction={() => { addExercise(false) }} />

    <IonContent class="modal-ion-content">
        <div className="spec-top-container exercise-add-container">
        <IonItem lines="none">
          <strong>Add an Exercise</strong>
        </IonItem>
        <InputContainer label={""} text={searchExercise} placeholderText="Search for an exercise" typekey="addExercise" inputChange={onSearchExercise} />
        <div className="exercise-container">
          {
            exerciseData.map((item:any, i:number) => (
            <IonItem key={i} onClick={()=>{onSelectExerciseItem(item)}} className={`${selectedExercise.id === item.id ? 'selected_exercise' : ''}`}>
              <IonLabel>{item.name}</IonLabel>
              <IonIcon icon={addSharp} slot="end" />
            </IonItem>
            ))
          }
          {
            isNoRecordsExercise &&
            <IonItem lines="none" class="no-records">
            No Records Exists
          </IonItem>
          }
        </div>
        </div>
    </IonContent>
    <IonFooter>
      <div className="ion-modal-footer">
        {
          isDisplayExerciseLoader &&
          <IonProgressBar type="indeterminate" color="success" />
        }
        <Button text='ADD' onAction={()=>{ onAddExerciseNew() }} disabled={!selectedExercise.id} />
      </div>
    </IonFooter>
    </IonModal>

  );
};

export default AddExercise;
