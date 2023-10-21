import React from 'react';
import { IonModal, IonContent, IonButton, IonRow, IonInput, IonItem, IonText, IonIcon, IonCol, IonLabel, IonFooter, IonCard, IonAvatar, IonCardContent } from '@ionic/react';
import { chevronBack, chevronBackSharp, closeSharp, close } from 'ionicons/icons';
import Button from '../button';
import './SelectedFoods.css';
import ModalHeader from '../modalHeader';

interface ContainerProps {
    showModal: boolean;
    onDisplaySelectedItems: Function;
    selectedFood:any;
    onFoodQtyChange: Function;
    onRemoveSelectedFood: Function;
    onSaveFood: Function;
};

const SelectedFoods: React.FC<ContainerProps> = ({ showModal, onDisplaySelectedItems, selectedFood, onRemoveSelectedFood, onFoodQtyChange, onSaveFood }) => {

    return (
      <IonModal isOpen={showModal}>
      <ModalHeader onAction={() => { onDisplaySelectedItems(false) }} />
        <IonContent class="modal-ion-content">

                <div  className="spec-top-container selected-food-container">
                <IonText><strong>Selected Food items</strong> ({selectedFood.length})</IonText>
  <div className="selected-foods-container">
  {
    selectedFood.map((item:any, i:number) => (
      <IonCard key={i} class="card_food_selected">
        <IonItem lines="none">
          <IonAvatar>
            <img src={item.photo.thumb} />
          </IonAvatar>
          <IonLabel class="item_label_food">
            <h5>{item.food_name}</h5>
            <div>
                 <IonInput inputmode="decimal" type="number" onBlur={(ev)=>{ onFoodQtyChange(i, ev) }} 
                 onKeyDown={e => {
                   if (e.keyCode === 13) {
                     onFoodQtyChange(i, e)
                   }
               }}
                 class="food_search_qty" value={item.log_qty} />
<IonText class="item_qty_val_food"> / {item.serving_qty} {item.serving_unit}</IonText>
             </div>
          </IonLabel>
          
        </IonItem>
        <IonRow>
    <IonCol><strong>Cals</strong></IonCol>
    <IonCol><strong>Protein</strong></IonCol>
    <IonCol><strong>Carbs</strong></IonCol>
    <IonCol><strong>Fat</strong></IonCol>
  </IonRow>
        <IonRow>
          <IonCol>{item.calccalories}</IonCol>
          <IonCol>{item.calcprotein}</IonCol>
          <IonCol>{item.calccarbs}</IonCol>
          <IonCol>{item.calcfat}</IonCol>
        </IonRow>
        <IonButton size="small" fill="clear" color="success" class="font-weight-500" onClick={()=>{onRemoveSelectedFood(i)}}>
          <IonIcon  ios={close} md={closeSharp}  />
          <IonText>Remove</IonText>
        </IonButton>
      </IonCard>
    ))
  }
  </div>
                </div>

                {/* </div> */}
        </IonContent>
        <IonFooter class="selected-foods-footer">
            <Button text="Save" onAction={onSaveFood} disabled={selectedFood.length === 0} />
                </IonFooter>
        </IonModal>

    )
}

export default SelectedFoods;
