import React, { useState } from 'react';
import { IonLoading, IonContent } from '@ionic/react';

const Loader: React.FC = () => {
  return (
    <IonContent>
      <IonLoading
        isOpen={true}
        //onDidDismiss={() => setShowLoading(false)}
        message={'Loading...'}
        //duration={5000}
      />
    </IonContent>
  );
};

export default Loader;
