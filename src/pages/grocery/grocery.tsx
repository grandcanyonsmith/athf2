import { IonButtons, IonContent, IonHeader, IonIcon, IonCard, IonCardContent, IonCheckbox, IonPage, IonText, IonToolbar, IonGrid, IonRow, IonCol, IonDatetime, IonItem, IonMenuToggle } from '@ionic/react';
import { personCircleOutline, cartOutline, personCircleSharp } from 'ionicons/icons';
import React, { useEffect } from 'react';
import GroceryHook from '../../hooks/groceryHook';
import GrocerySync from '../../components/grocerysync';
import Recipes from '../../components/recipes';
import AddNotes from '../../components/addNotes';
import FooterItems from '../../components/footerItems';
import AppHook from '../../hooks/appHook';
import { trackGAView } from '../../actions/common';

import { Plugins, Capacitor } from "@capacitor/core";

const Grocery:React.FC = (props:any) => {
  const name = 'Grocery List';
  const { isImpersonated, toggleMenu } = AppHook();
  const { isDisplayGrocerysync, handleGrocerySync, isDisplayRecipes, handleRecipes, getgrocerylist, groceryList, recipes, onRecipeSelected,
  onGroceryNotes, isDisplayNotes, onNotesChange, onSaveNotes, selectedNote, notes, onCart, onGrocerySelected, isNoActiveProgram } = GroceryHook();
  useEffect(() => {
    getgrocerylist();
    trackGAView('Grocery screen');
  }, []);

  useEffect(() => {
    getgrocerylist();
    trackGAView('Grocery screen');
  }, [isImpersonated]);
//   useEffect(()=>{
//     if (Capacitor.isNative) {
//         Plugins.App.addListener("backButton", (e) => {
//           onGroceryNotes(false);
//         });
//       }
// })
  return (
    <IonPage className="grocery">
      <IonHeader style={{'height': '30px', background: '#ffffff'}}>
        <IonToolbar style={{'display': 'none'}}>
          <img alt="THF Logo" className="thflogoimg" src="/assets/thflogo.png" />
          <IonButtons slot="end" class="handle-menu-toggle-header">
            <IonIcon icon={cartOutline} class="cart-icon" onClick={()=>{ onCart(props)}}/>

            <IonMenuToggle class="menu-toggle">
              <IonIcon icon={personCircleOutline} />
            </IonMenuToggle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol class="fontSize">
              <IonItem lines="none">
                <IonText class="fontBold">Grocery List</IonText>
                <IonIcon ios={personCircleOutline} md={personCircleSharp} slot="end" onClick={()=>{ toggleMenu(); }} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow class="specific-icons">
            <IonCol />
            <IonCol />
            <IonCol />
            <IonCol onClick={() => {  }}>
              {/* <img src="./assets/grocerysync.png" /> */}
            </IonCol>
            <IonCol>  
            </IonCol>
            <IonCol onClick={() => {
              if (isDisplayNotes) {
                onGroceryNotes(false);
                setTimeout(()=>{
                  onGroceryNotes(true);
                }, 0);
              } else {
                onGroceryNotes(true);
              }
            }}>
              <img src="./assets/notes.png" />
            </IonCol>
          </IonRow>
        </IonGrid>
        {
                    isNoActiveProgram && 
                    <IonCard>
                        <IonCardContent>
                            No Active Programs found
                        </IonCardContent>
                    </IonCard>
                }
        <IonGrid>
          {
            !isNoActiveProgram && 
            <IonRow>
            <IonCol size="1">

            </IonCol>
            <IonCol size="2">
              <strong>Qty</strong>
            </IonCol>
            <IonCol size="2">
              <strong>Unit</strong>
            </IonCol>
            <IonCol size="3">
              <strong>Brand</strong>
            </IonCol>
            <IonCol size="3">
              <strong>Food</strong>
            </IonCol>
          </IonRow>
          }
          
          {
            groceryList.map((item: any, index:number) => (
              <IonRow class="grocery-row" key={index}>
                <IonCol size="1">
                  <IonCheckbox color="success" checked={!!item.id} onClick={(event) => onGrocerySelected(event, item, index)} disabled={false} />
                </IonCol>
                <IonCol size="2">
                  {item.qty}
                </IonCol>
                <IonCol size="2">
                  {item.unit}
                </IonCol>
                <IonCol size="3">
                  {item.brand}
                </IonCol>
                <IonCol size="3">
                  {item.name}
                </IonCol>
                <IonCol size="1">
                  {
                    item.recipeData &&
                    <img src="./assets/recipes.png" 
                      onClick={()=>{
                        onRecipeSelected(item.recipeData);
                        if (isDisplayRecipes) {
                          handleRecipes(false);
                          setTimeout(() => {
                            handleRecipes(true);
                          }, 0);
                        } else {
                          handleRecipes(true);
                        }
                      }}
                    />
                  }
                </IonCol>
              </IonRow>
            ))
          }
        </IonGrid>
        <GrocerySync showModal={isDisplayGrocerysync} handleGrocerySync={handleGrocerySync} />
        <Recipes showModal={isDisplayRecipes} handleRecipes={handleRecipes} recipes={recipes} />
        <AddNotes showModal={isDisplayNotes} addNotes={onGroceryNotes} selectedDate={''} onNotesChange={onNotesChange} notes={notes}
                    onSaveNotes={onSaveNotes} selectedwaternote={selectedNote} 
                />
      </IonContent>
      <FooterItems specific="grocery" history={props.history} />
    </IonPage>
  );
};

export default Grocery;
