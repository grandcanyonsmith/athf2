import React from 'react';
import { IonModal, IonContent, IonBadge, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonText, IonIcon, IonThumbnail, IonLabel, IonVirtualScroll, IonFooter, IonProgressBar } from '@ionic/react';
import { chevronBack, addSharp, chevronBackSharp, chevronUp, chevronUpSharp, checkmarkCircle } from 'ionicons/icons';
import InputContainer from '../inputContainer/inputContainer';
import './Food.css';
import ModalHeader from '../modalHeader';

interface ContainerProps {
  showModal: boolean;
  addFood: Function;
  onSearchFood: Function;
  searchFood?:any;
  foodData?: any;
  onSelectedFoodItem: Function;
  selectedFood?: any;
  onBarCodeAction: Function;
  onDisplaySelectedItems: Function;
  isDisplaySelectedItems: boolean;
  isDisplaySelectedFoodLoader: boolean;
  selectedItemIndex: number;
  onSelectedItemIndex: Function;
}

const AddFood: React.FC<ContainerProps> = ({showModal, addFood, onSearchFood, onBarCodeAction, searchFood, foodData, onSelectedFoodItem, selectedFood, onDisplaySelectedItems, isDisplaySelectedItems, isDisplaySelectedFoodLoader, selectedItemIndex, onSelectedItemIndex}) => {

  return (
    <IonModal isOpen={showModal}>
    <ModalHeader onAction={() => { addFood(false) }} />
    <IonContent class="modal-ion-content">
        <div className="spec-top-container food-main-container">
        <IonItem lines="none" class="add-food-text">
          <strong>Add food to your meal</strong>
        </IonItem>
        <InputContainer label={""} text={searchFood} placeholderText="Food, meal, brand etc." isBarCode={true} onBarCodeAction={onBarCodeAction} typekey="addFood" inputChange={onSearchFood} />
        {foodData.results.length > 0 && <IonGrid class="search-category">
          <IonRow>
            <IonCol class="item-all" onClick={()=>{onSelectedItemIndex(0)}}><div className={`${selectedItemIndex === 0 ? 'selected-food-item': ''}`}>All</div></IonCol>
            <IonCol class="item-common" onClick={()=>{ onSelectedItemIndex(1)}}><div className={`${selectedItemIndex === 1 ? 'selected-food-item': ''}`}>Common</div></IonCol>
            <IonCol class="item-branded" onClick={()=>{ onSelectedItemIndex(2)}}><div className={`${selectedItemIndex === 2 ? 'selected-food-item': ''}`}>Branded</div></IonCol>
          </IonRow>
        </IonGrid>}
        
        <div className="food-container">
          {
            foodData.results.map((item:any, i:number) => (
              <IonItem button key={i} onClick={()=>{onSelectedFoodItem(item, i)}} mode='md'
              
              >
        
              <IonThumbnail slot="start" class="img-item">
                <img src={item.thumbnail} alt="" />
              </IonThumbnail>
            <IonLabel>
              <IonText><p>{item.item_name}</p></IonText>
              <IonText><p>{item.serving_qty} {item.serving_uom}</p></IonText>
            </IonLabel>
            <IonIcon icon={item.selected ? checkmarkCircle : addSharp} slot="end" />
            
            {/* <IonRippleEffect type="bounded"></IonRippleEffect> */}
            </IonItem>
            ))
          }
          {
            foodData.total === 0 &&
            <IonItem lines="none" class="no-records">
            No Records Exists
          </IonItem>
          }
          
        </div>
        </div>
        <div className="ion-modal-footer food-item-footer">
        {
        isDisplaySelectedFoodLoader &&
          <IonProgressBar type="indeterminate" color="success" />
        }
          {/* <IonFooter>
          <IonItem lines="none" onClick={() => { 
            if (isDisplaySelectedItems) {
              onDisplaySelectedItems(false)
              setTimeout(()=>{
                onDisplaySelectedItems(true)
              }, 0);
          } else {
            onDisplaySelectedItems(true)
          }
          }}>
          <IonText>
            Items Added
          </IonText>
          <IonBadge color="success" slot="end">
            {selectedFood.length}
          </IonBadge>
          <IonIcon ios={chevronUp} md={chevronUpSharp} slot="end" />
        </IonItem>
        </IonFooter> */}
        </div>
    </IonContent>
    </IonModal>

  );
};

export default AddFood;
