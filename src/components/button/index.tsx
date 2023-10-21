import React from 'react';
import { IonButton } from '@ionic/react';
import './Button.css';

interface ContainerProps {
    text: string;
    onAction: Function;
    disabled?: boolean;
    props?: any;
}

const Button: React.FC<ContainerProps> = ({ text, onAction, disabled = false, props }) => {
  return (
<IonButton color="success" class="round" expand="block"
  disabled={disabled}
    onClick={() => { onAction() }}
>
    {text}
</IonButton>
  );
};

export default Button;
