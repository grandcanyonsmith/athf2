import React from 'react';
import { IonItem, IonLabel, IonInput, IonIcon } from '@ionic/react';
import { eyeOutline, eyeSharp, eyeOff, eyeOffSharp, barcodeOutline, barcodeSharp } from 'ionicons/icons';
import './inputContainer.css';

interface ContainerProps {
    label: string;
    text: string;
    inputType?: any;
    inputChange: Function;
    typekey: string;
    isTypePassword?: any;
    passwordAction?: any;
    specCls?: any;
    isDisabled? : any;
    isBarCode?: any;
    placeholderText?: string;
    onBarCodeAction?:any;
}

const InputContainer: React.FC<ContainerProps> = ({ label, text, inputType = 'text', inputChange, typekey, isTypePassword, passwordAction, specCls='', onBarCodeAction, isDisabled = false, isBarCode = false, placeholderText = '' }) => {
  return (
    <>
    {
      isBarCode ? 
      <IonItem lines="none">
    <IonInput value={text} class="spec-out-icon-input" type={inputType} placeholder={placeholderText} onIonChange={e => inputChange(e.detail.value, typekey)}> </IonInput>
    <IonIcon ios={barcodeOutline} md={barcodeSharp} class="pallette-blue" onClick={()=>{onBarCodeAction()}} />
      </IonItem> :
    <IonItem color="bgtrans" lines="none" class={`input-field ${specCls}`}>
    <IonLabel position="stacked">{label}</IonLabel>
    <div className="input-section">
    <IonInput value={text} type={inputType? inputType : "password"} disabled={isDisabled} placeholder={placeholderText} onIonChange={e => inputChange(e.detail.value, typekey)}> </IonInput>
    {isTypePassword && 
      <IonIcon slot="end" ios={inputType === 'password' ? eyeOutline : eyeOff} md={inputType === 'password'? eyeSharp:eyeOffSharp} class="input-icon" onClick={()=> passwordAction(typekey)} />    
    }
    {/* {
      isBarCode &&
      <IonIcon ios={barcodeOutline} md={barcodeSharp} onClick={()=>{onBarCodeAction()}}  />
    } */}
    </div>
</IonItem>
    }
    </>
  );
};

export default InputContainer;
