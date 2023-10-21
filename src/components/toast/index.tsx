import React from 'react';
import { IonToast } from '@ionic/react';

interface ContainerProps {
  toast: any;
  onHandleToast: Function;
}

const ToastContainer: React.FC<ContainerProps> = ({ toast, onHandleToast }) => {
  return (
    <IonToast
        isOpen={toast.isDisplay}
        onDidDismiss={() => onHandleToast({isDisplay: false})}
        message={toast.msg}
        position="top"
        duration={3000}
        color={toast.isSuccess ? 'success' : 'danger'}
    />
  );
};

export default ToastContainer;
