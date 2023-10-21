import Menu from './components/Menu';
// import TabsContainer from './components/tabsContainer';

// import Page from './pages/page/Page';
import Login from './pages/login';
import Home from './pages/home/Home';
import Settings from './pages/settings';
import Profile from './pages/profile';
import Help from './pages/help';
import Privacy from './pages/privacy';
import Loader from './components/loader';
import Initial from './pages/initial';
import Feedback from './pages/feedback';
import Version from './pages/version';
import Nutrition from './pages/nutrition';
import Exercise from './pages/exercise';
import Goals from './pages/goals';
import Grocery from './pages/grocery';
import Cart from './pages/cart';
import Impersonate from './pages/impersonate';


import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, IonAlert, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { toggleSharp } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { Plugins } from "@capacitor/core";

import { registerForPushNotifications, stractTrackingGA, startUXCAMTracking } from './actions/common';

import Toast from './components/toast';
import LogOut from './components/logout';
import Branding from './components/branding';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import AppHook from './hooks/appHook';

const { Network, App: appPlugin } = Plugins;

const App: React.FC = (props: any) => {
  const [networkState, setNetworkState] = useState("none");
  const { isLoggedIn, isLoading, onHandleToast, toast, onSilentLogin, handleLogout, isDisplayLogout, onLogout, onDisplayForceUpdate, isDisplayForceUpdate, launchAppPlayStore, isImpersonated, onSwitchBackImpersonate, isShowBranding, companyData, setHeaderHeight } = AppHook();
  
  async function getInitialNetworkStatus () {
    let status = await Network.getStatus();
    setNetworkState(status.connectionType);
    //console.log('initial status' + status.connectionType);
  }
  
  useEffect(() => {
    // onSilentLogin(props);
    // registerForPushNotifications();
    setHeaderHeight();
    stractTrackingGA();
    getInitialNetworkStatus();

    startUXCAMTracking();
    
    Network.addListener("networkStatusChange", status => {
      //console.log('event changed' + status.connectionType);
      setNetworkState(status.connectionType);
    });
  }, []);
  return (
    <IonApp>
      { isLoading && <Loader /> }
      <Toast onHandleToast={onHandleToast} toast={toast} />
      <Branding showModal={isShowBranding} companyData={companyData} />
      {/* <IonAlert
          isOpen={isDisplayForceUpdate}
          onDidDismiss={() => {onDisplayForceUpdate(false)}}
          cssClass='my-custom-class'
          header={'App update available'}
          message={`There's a new version available, would you like to get it now?`}
          buttons={[
            {
              text: 'Force Update',
              role: 'update',
              cssClass: 'secondary',
              handler: blah => {
                launchAppPlayStore();
                return false;
              }
            },
            {
              text: 'Close',
              handler: () => {
                appPlugin.exitApp();
              }
            }
          ]}
        /> */}
      <LogOut showModal={isDisplayLogout} handleLogout={handleLogout} onLogout={onLogout} />
      {
        networkState === 'none' &&
        <div className="no-network">
          No Network Connection, Please check network
        </div>
      }
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {
            isLoggedIn &&  <Menu {...props} handleLogout={handleLogout} />
          }
          <IonRouterOutlet id="main">
            {/* <Route path="/page/:name" component={Page} exact /> */}
            <Route path="/" component={Initial} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/home" component={Home} exact />
            <Route path="/page/profile" component={Profile} exact />
            <Route path="/page/settings" component={Settings} exact />
            <Route path="/page/privacy" component={Privacy} exact />
            <Route path="/page/help" component={Help} exact />
            <Route path="/page/feedback" component={Feedback} exact />
            <Route path="/page/version" component={Version} exact />
            <Route path="/tabs/nutrition" component={Nutrition} exact />
            <Route path="/tabs/exercise" component={Exercise} exact />
            <Route path="/tabs/goals" component={Goals} exact />
            <Route path="/tabs/grocery" component={Grocery} exact />
            <Route path="/page/cart" component={Cart} exact />
            <Route path="/page/impersonate" component={Impersonate} exact />

            {/* <Route path="/tabs" component={TabsContainer} /> */}
            {/* <Redirect from="/" to="/page/Inbox" exact /> */}
          </IonRouterOutlet>
        </IonSplitPane>
        {/* {
          isLoggedIn &&  <TabsContainer />
        } */}
      </IonReactRouter>
      {
        isImpersonated && 
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton color="danger" onClick={()=>{onSwitchBackImpersonate(props)}}>
          <IonIcon icon={toggleSharp}></IonIcon>
        </IonFabButton>
      </IonFab>
      }
    </IonApp>
  );
};

export default App;
