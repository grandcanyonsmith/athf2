import React from 'react';
import { IonModal, IonContent } from '@ionic/react'
import './Branding.css';

interface ContainerProps {
    showModal: boolean;
    companyData: any
}

const Branding: React.FC<ContainerProps> = ({showModal, companyData}) => {
    return (
        <IonModal isOpen={showModal}>
            <IonContent class="modal-ion-content">
                <div className='company_name_branding'>
                    {companyData.name}
                </div>
                <div className='company_logo_branding'>
                    <img src={companyData.logo} alt="Logo"/>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default Branding;