import React from 'react';
import { IonModal, IonContent, IonItem, IonIcon, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonText } from '@ionic/react';
import { closeOutline, closeSharp, chevronBack, chevronBackSharp } from 'ionicons/icons';
import InputContainer from '../inputContainer/inputContainer';
import './Dining.css';
import Button from '../button';
import ModalHeader from '../modalHeader';


interface ContainerProps {
    showModal: boolean;
    onDining: Function;
    diningInfo: any;
    onRestaurantSearch: Function;
    searchRestaurants: any;
    onSelectedRestaurant: Function;
    onViewGuide: Function;
    onCuisineSelect: Function;
    searchedRestaurant?: any;
    diningInfoSelected?: any;
    isDisplayDiningInfo: boolean;
}

const Dining: React.FC<ContainerProps> = ({ showModal, onDining, diningInfo, onRestaurantSearch, searchRestaurants, onSelectedRestaurant, onViewGuide, onCuisineSelect, searchedRestaurant = '', diningInfoSelected, isDisplayDiningInfo }) => {
    const customActionSheetOptions = {
        header: 'Cuisine',
        subHeader: 'Choose Cuisine'
      };
    return (
        <IonModal isOpen={showModal}>
        <ModalHeader onAction={() => { onDining(false) }} />
        <IonContent class="modal-ion-content">

                <div className="spec-top-container padding-main dining-main-container">
                    <IonItem lines="none">
                        <IonText>
                            <strong>Dining Out Guide</strong>
                        </IonText>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel class="cuisine-label">
                            <strong>Choose a Cuisine</strong>
                        </IonLabel>
                    </IonItem>
                    <IonItem lines="none">
        <IonSelect
          interfaceOptions={customActionSheetOptions}
          interface="action-sheet"
          placeholder="None"
          class="select-action"
          onIonChange={(ev) => { onCuisineSelect(ev.detail.value) }}
        >
            {Object.keys(diningInfo.cuisine).map((key) => (
                <IonSelectOption value={key} >{diningInfo.cuisine[key].contentName}</IonSelectOption>
            ))}
          
        </IonSelect>
      </IonItem>
                    <IonItem lines="none" >
                        <IonText class="aligncenter">
                            <strong>Or</strong>
                        </IonText>
                    </IonItem>
                    <IonItem lines="none" class="choose-restaurant-label">
                        <IonLabel class="cuisine-label">
                            <strong>Choose a restaurant</strong>
                        </IonLabel>
                    </IonItem>
                    <InputContainer label={""} placeholderText={"Search For Restaurant"} text={searchedRestaurant} typekey="restaurant" inputChange={onRestaurantSearch} />
                    <div className="restaurant-items">
                        {
                            searchRestaurants.map((item:any)=>(
                                <IonItem onClick={()=>{onSelectedRestaurant(item)}}
                                className={`${diningInfoSelected.restaurant.contentName === item.contentName ? 'selected_restaurant' : ''}`}
                                >
                                    <IonText>
                                        {item.contentName}
                                    </IonText>
                                </IonItem>
                            ))
                        }
                        {
                            searchRestaurants.length === 0 && searchedRestaurant.length > 0 &&
                            <IonItem lines="none" class="no-records">
                            No Records Exists
                            </IonItem>
                        }
                    </div>
                </div>
                <div className="ion-modal-footer">
                    <Button text='VIEW GUIDE' onAction={() => {
                        if (isDisplayDiningInfo) {
                            onViewGuide(false);
                            setTimeout(()=>{
                                onViewGuide(true);
                            },0);
                        }  else {
                            onViewGuide(true);
                        }
                    }} />
                </div>
        </IonContent>
        </IonModal>
    );
};

export default Dining;
