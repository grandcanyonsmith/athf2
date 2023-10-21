import { IonButtons, IonContent, IonItem, IonButton, IonText, IonTextarea, IonFooter, IonCol, IonHeader, IonMenuToggle, IonLabel, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React, { useEffect } from 'react';
import { personCircleOutline, chevronForward, chevronDown, documentAttach, documentAttachOutline, close, closeSharp, chevronBack } from 'ionicons/icons';
import BackContainer from '../../components/backContainer/backContainer';
import './Cart.css';
import CartHook from '../../hooks/cartHook';
import { trackGAView } from '../../actions/common';

const CartBody: React.FC = (props:any) => {

  const name = 'Cart';
  const { getCartData, cartData } = CartHook();

  useEffect(() => {
    getCartData();
    trackGAView('Cart data');
  }, []);

  return (
    <IonPage>
       <IonHeader style={{'height': '30px', background: '#ffffff'}}>
        <IonToolbar>
          <img alt="THF Logo" className="thflogoimg" src="/assets/thflogo.png" />
          <IonButtons slot="end" class="handle-menu-toggle-header">
            <IonMenuToggle class="menu-toggle">
              <IonIcon icon={personCircleOutline} />
            </IonMenuToggle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <BackContainer name={''} />
        <div className="cart-data">
        {
          cartData.map((item:any, index:number) => (
                <IonCard key={index}>
              <IonCardHeader>
          <IonCardSubtitle>{item.name}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent class="textAlignCenter">
              <IonRow>
                <IonCol><strong>Brand</strong></IonCol>
                <IonCol><strong>Unit</strong></IonCol>
                <IonCol><strong>Qty</strong></IonCol>
              </IonRow>
              <IonRow>
                <IonCol>{item.brand || '-'}</IonCol>
                <IonCol>{item.unit}</IonCol>
                <IonCol>{item.qty}</IonCol>
              </IonRow>

              </IonCardContent>
            </IonCard>
          ))
        }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CartBody;
