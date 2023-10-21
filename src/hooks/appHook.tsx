import { useContext } from 'react';
import { menuController } from '@ionic/core';
import { AppContext } from '../context/appContext';
import { getStorage, setAccessToken, clearStorage, launchApp, registerForPushNotifications, setLoginData, getActualLoggedInId, getTypePlatform } from '../actions/common';
import Constants from '../constants/appConstants';

import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';
import { getApi } from '../actions/http';
import Method from '../constants/methodConstants';

const AppHook = () => {
  const [state, setState] = useContext(AppContext);
  
  function onUserLogged(isLogged:boolean) {
    setState((stateObj:any) => ({
      ...stateObj,
      isLoggedIn: isLogged
    }));
  }

  function onHandleLoading(isSpinning:boolean) {
    setState((stateObj:any) => ({
      ...stateObj,
      isLoading: isSpinning
    }));
  }

  function onHandleToast(data: any) {
    setState((stateObj:any) => ({
      ...stateObj,
      'toast': data
    }));
  }

  async function onSilentLogin(props:any) {
    const tokens = await getStorage(Constants.KEY_SESSION);
    if (tokens) {
      onUserLogged(true);
      setAccessToken(tokens.accessToken);
      //registerForPushNotifications();
    }
  }

  function handleLogout(isDisplay: boolean) {
    setState((stateObj:any) => ({
      ...stateObj,
      'isDisplayLogout': isDisplay
    }));
  }

  function onLogout() {
    handleLogout(false);
    Plugins.GoogleAuth.signOut();
    clearStorage();
  }

  function onDisplayForceUpdate(isDisplay:boolean) {
    setState((stateObj:any) => ({
      ...stateObj,
      'isDisplayForceUpdate': isDisplay
    }));
  }

  function launchAppPlayStore() {
    launchApp();
  }

  function onImpersonated(isImpersonated:boolean) {
    setState((stateObj:any) => ({
      ...stateObj,
      'isImpersonated': isImpersonated
    }));
  }

  function onShowBranding(isShow: boolean, companyData:any) {
    setState((stateObj:any) => ({
      ...stateObj,
      isShowBranding: isShow,
      companyData: companyData
    }));
  }

  async function onSwitchBackImpersonate(props:any) {
    const url = `${Constants.baseUrl}${Method.impersonatetoadmin}${getActualLoggedInId()}`;
    const response = await getApi(url);
    const specdata = response.data;
    setLoginData(specdata);
    setAccessToken(specdata.accessToken);
    onImpersonated(false);
    // props.history.push('/tabs/nutrition');
  }

  function toggleMenu() {
    menuController.toggle();
  }

  function setHeaderHeight() {
    setState((stateObj:any) => ({
      ...stateObj,
      headerHeight: getTypePlatform() ? '30px' : '0px'
    }));
  }

  return {
    isLoggedIn: state.isLoggedIn,
    onUserLogged,
    isLoading: state.isLoading,
    onHandleLoading,
    onHandleToast,
    toast: state.toast,
    onSilentLogin,
    isDisplayLogout: state.isDisplayLogout,
    handleLogout,
    onLogout,
    isDisplayForceUpdate: state.isDisplayForceUpdate,
    onDisplayForceUpdate,
    launchAppPlayStore,
    isImpersonated: state.isImpersonated,
    onImpersonated,
    onSwitchBackImpersonate,
    toggleMenu,
    isShowBranding: state.isShowBranding,
    onShowBranding,
    companyData: state.companyData,
    setHeaderHeight,
    headerHeight: state.headerHeight
  };
};

export default AppHook;
