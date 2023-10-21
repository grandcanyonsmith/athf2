import React from 'react';
import { IonContent, IonPage, IonProgressBar, useIonViewWillEnter  } from '@ionic/react';
import InitialHook from '../../hooks/initialHook';
import { trackGAView } from '../../actions/common';

const Initial = (props:any) => {
    const { checkAndRedirect } = InitialHook();
    // useEffect(() => {
    //     checkAndRedirect(props);
    // }, []);
    useIonViewWillEnter(() => {
        checkAndRedirect(props);
        trackGAView('Initial app launch screen');
    });
    return (
        <IonPage>
            <IonContent fullscreen class="main-bg">
                <img src="/assets/thf.png" />
                <div className="progress-item">
                    <IonProgressBar color="success" type="indeterminate"></IonProgressBar>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Initial;
