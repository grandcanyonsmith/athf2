import React from 'react';
import { IonModal, IonContent, IonItem, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonLabel } from '@ionic/react';
import { chevronBack, chevronBackSharp } from 'ionicons/icons';
import './Recipes.css';
import ModalHeader from '../modalHeader';

interface ContainerProps {
  showModal: boolean;
  handleRecipes: Function;
  recipes: any;
}

const Recipes: React.FC<ContainerProps> = ({ showModal, handleRecipes, recipes }) => {

  return (
    <IonModal isOpen={showModal}>
    <ModalHeader onAction={() => { handleRecipes(false) }} />
    <IonContent class="modal-ion-content">
        <div className="spec-top-container recipes-container">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem lines="none" class="fontBold recipes-header">
                  Recipes
                </IonItem>
              </IonCol>
              <IonCol>

              </IonCol>
            </IonRow>
          </IonGrid>
          {
            recipes.length === 0 &&
            <IonCard>
              <IonItem lines="none" >
                <IonLabel>
                  No Recipes Exists
                </IonLabel>
              </IonItem>
            </IonCard>
          }
          {
            recipes.map((r: any) => (
              <>
                <IonItem lines="none" class="fontBold">
                  {r.name}
                </IonItem>
                <IonItem lines="none" class="fontBold">
                  Ingredients:
            </IonItem>
                <ol className="alignLeft">
                  {
                    r.recipefoods.map((rf: any) => (
                      <li>{rf.qty} {rf.unit} {rf.name}</li>
                    ))
                  }
                </ol>
                <IonItem lines="none" class="fontBold">
                  Instructions:
        </IonItem>
                <div className="recipes-info">
                  {r.instructions}
                </div>
              </>
            ))
          }
        </div>
    </IonContent>
    </IonModal>
  );
};

export default Recipes;
