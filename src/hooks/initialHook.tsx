import { useContext } from 'react';
import Constants from '../constants/appConstants';
import Method from '../constants/methodConstants';
import { postApi, getApi } from '../actions/http';
import AppHook from './appHook';
import { isSuccess, setAccessToken, getStorage, setLoginData, setStorage, registerForPushNotifications, getAppVersion, getTypePlatform } from '../actions/common';

const InitialHook = () => {
    const { onUserLogged, onDisplayForceUpdate } = AppHook();

    const handleForceUpdate = async () => {
      const url = `${Constants.baseUrl}${Method.newappversion}`;
      const result = await getApi(url);
      console.log('Launched force update window');
      console.log(result);

      if (isSuccess(result)) {
        const { data = {} } = result; 
        const response = getTypePlatform() ? data.ios : data.android;
        const currentAppVersion = await getAppVersion();
        if (parseFloat(response.version) > parseFloat(currentAppVersion) && response.isForceUpdate) {
          onDisplayForceUpdate(true);
        } else {
          onDisplayForceUpdate(false);
        }
      }
    }

    const checkAndRedirect = async (props:any) => {
        handleForceUpdate();
        const tokens = await getStorage(Constants.KEY_SESSION);
        if (!tokens) {
          props.history.push('/login');
          return false;
        }
        setAccessToken(tokens.accessToken);
        if (tokens) {
        const reqData = {
          refresh_token: tokens.refreshToken
        }
        const url = `${Constants.baseUrl}${Method.loginrefresh}`;
        const result = await postApi(url, reqData);
        if (isSuccess(result)) {
          const data = result.data;
          await setStorage(Constants.KEY_SESSION, data);
          setAccessToken(data.accessToken);
          setLoginData(data);
          onUserLogged(true);
          //registerForPushNotifications();
          props.history.push('/tabs/nutrition');
        } else {
            props.history.push('/login');
        }
      } else {
          props.history.push('/login');
      }
    }
    return {
        checkAndRedirect
    };
};

export default InitialHook;
