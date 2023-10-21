import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { logOutOutline, logOutSharp, personSharp, personOutline, settingsOutline, settingsSharp, helpCircleOutline, helpCircleSharp, lockClosedOutline, lockClosedSharp, toggleOutline, toggleSharp } from 'ionicons/icons';
import './Menu.css';
import { clearStorage } from '../actions/common';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Profile',
    url: '/page/profile',
    iosIcon: personOutline,
    mdIcon: personSharp
  },
  {
    title: 'Settings',
    url: '/page/settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp
  },
  {
    title: 'Help',
    url: '/page/help',
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleSharp
  },
  {
    title: 'Privacy Policy',
    url: '/page/privacy',
    iosIcon: lockClosedOutline,
    mdIcon: lockClosedSharp
  },
  {
    title: 'Impersonate',
    url: '/page/impersonate',
    iosIcon: toggleOutline,
    mdIcon: toggleSharp
  }
];

const labels = [ {
  title: 'Logout',
  url: '/page/logout',
  iosIcon: logOutOutline,
  mdIcon: logOutSharp
}];

const Menu: React.FC = (props:any) => {
  const location = useLocation();

  function onlogout(history:any) {
    clearStorage();
    //history.push('/')
  }

  return (
    <IonMenu contentId="main" side="end" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {/* <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote> */}
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          {labels.map((label, index) => (
            <IonMenuToggle key={index} autoHide={false}>
            <IonItem lines="none" key={index} onClick={()=>{
              props.handleLogout(true);
            }}>
              <IonIcon slot="start" ios={label.iosIcon} md={label.mdIcon} />
              <IonLabel>{label.title}</IonLabel>
            </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
