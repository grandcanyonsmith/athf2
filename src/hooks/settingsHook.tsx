import { useContext } from 'react';
import { SettingsContext } from '../context/settingsContext';
import Constants from '../constants/appConstants';
import Method from '../constants/methodConstants';
import { getApi, postApi } from '../actions/http';
import { isSuccess, getInfoFormat } from '../actions/common';
import AppHook from './appHook';

const LoginHook = () => {
  const [state, setState] = useContext(SettingsContext);
  const { onHandleLoading, onHandleToast } = AppHook();


  function onInputChange(data:any, key:string) {
    const { settingsData }  = state;
    settingsData[key] = data;
    setState((stateObj:any) => ({
        ...stateObj,
        settingsData: settingsData
      }));
  }

  function onPasswordAction(key:string) {
    const { inputPassword }  = state;
    inputPassword[key] = !inputPassword[key];
    setState((stateObj:any) => ({
      ...stateObj,
      inputPassword: inputPassword
    }));
  }

  async function getUserData() {
    const url = `${Constants.baseUrl}${Method.getUser}`;
    const response = await getApi(url);
    if (isSuccess(response)) {
      const userEmail = response.data[0]['user.email'];
      onInputChange(userEmail, 'email')
    }
  }

  async function onSaveSettings() {
    const { settingsData }  = state;
    const password = {
      password: settingsData.password
    }

    onHandleLoading(true);
    const url = `${Constants.baseUrl}${Method.resetPassword}`;
    const response = await postApi(url, password);
    if (isSuccess(response)) {
      onHandleToast(getInfoFormat('Password updated successfully', true));
    }
    onHandleLoading(false);

  }

  return {
    onInputChange,
    onSaveSettings,
    settingsData: state.settingsData,
    inputPassword: state.inputPassword,
    onPasswordAction,
    getUserData
  };
};

export default LoginHook;
