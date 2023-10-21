import { useContext } from 'react';
import { LoginContext } from '../context/loginContext';
import Constants from '../constants/appConstants';
import Method from '../constants/methodConstants';
import { postApi, getApi } from '../actions/http';
import AppHook from './appHook';
import { isSuccess, getInfoFormat, setStorage, setAccessToken, getStorage, setLoginData, registerForPushNotifications, trackGAEvent } from '../actions/common';
import { logException } from '../actions/common';

import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@awesome-cordova-plugins/sign-in-with-apple';

import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';

const LoginHook = () => {
  const [state, setState] = useContext(LoginContext);

  const { onUserLogged, onHandleLoading, onHandleToast, onShowBranding } = AppHook();

  function onInputChange(data:any, key:string) {
    const { userData }  = state;
    userData[key] = data;
    setState((stateObj:any) => ({
      ...stateObj,
      userData: userData
    }));
  }

  function onForgotPassword(isDisplay:boolean) {
    setState((stateObj:any) => ({
      ...stateObj,
      isForgotModal: isDisplay
    }));
  }

  function onPasswordAction() {
    const { isPasswordHide } = state;

    setState((stateObj:any) => ({
      ...stateObj,
      isPasswordHide: !isPasswordHide
    }));
  }

  async function showBranding() {
    const url = `${Constants.baseUrl}${Method.getCompanyDetails}`;
      const response = await getApi(url);
      // registerForPushNotifications();
      // setTimeout(()=>{
      onShowBranding(true, response.data ? response.data[0] : {});
      setTimeout(()=>{
        onShowBranding(false, {});
      },3000);
  }

  async function onLoginSubmit(items:any) {
    onHandleLoading(true);
    const { userData, isRememberMe }  = state;
    const url = `${Constants.baseUrl}${Method.login}`;
    const result = await postApi(url, userData).catch(err => err);
    onHandleLoading(false);

    if (isSuccess(result)) {
      // trackGAEvent('user_login', 'login', 'User did normal login');
      const specdata = result.data;
      if (isRememberMe) {
        await setStorage(Constants.KEY_SESSION, specdata);
      }
      setLoginData(specdata);
      setAccessToken(specdata.accessToken);
      onUserLogged(true);
      await showBranding();
      items.history.push('/tabs/nutrition');
      // }, 1000);
    } else {
      const errInfo = result.data;
      if (errInfo) {
        if (errInfo.errors) {
          logException(errInfo.errors[0]);
          onHandleToast(getInfoFormat(errInfo.errors, false));
        } else {
          onHandleToast(getInfoFormat(errInfo.error, false));
        }
      } else {
        onHandleToast(getInfoFormat(errInfo ? errInfo : result, false));
      }
    }
  }

  function onForgotPasswordEmail(data:any) {
    setState((stateObj:any) => ({
      ...stateObj,
      forgotEmail: data
    }));
  }

  async function onReset() {

    onHandleLoading(true);
    const { forgotEmail }  = state;
    const url = `${Constants.baseUrl}${Method.forgotPassword}`;
    const data = {
      email: forgotEmail
    };

    const result = await postApi(url, data);

    if (isSuccess(result)) {
      onHandleToast(getInfoFormat('Password Reset Successfully', true));
      onForgotPassword(false);
    } else {
      let errorinfo = '';
      if (result.data) {
        if (result.data.error) {
          errorinfo = result.data.error;
        } else if (result.data.errors) {
          errorinfo = 'Invalid Email';
        }
      }
      onHandleToast(getInfoFormat(errorinfo, false));
    }
    onHandleLoading(false);
  }

  async function onSilentLogin(props:any) {
    const tokens = await getStorage(Constants.KEY_SESSION);
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
    }
  }
  }

  function onRememberCheck(ev:any) {
    const ischecked = ev.target.checked;
    setState((stateObj:any) => ({
      ...stateObj,
      isRememberMe: ischecked
    }));
  }

  async function onLoginWithGoogle(props:any) {
    const authResult:any = await Plugins.GoogleAuth.signIn();
    if (authResult && authResult.authentication && authResult.authentication.idToken) {
      const url = `${Constants.baseUrl}${Method.loginGmail}`;
      const reqData:any = {
        token: authResult.authentication.idToken
      };
      const result = await postApi(url, reqData);
      if (isSuccess(result)) {
        const data = result.data;
        const { isRememberMe } = state;
        if (isRememberMe) {
          await setStorage(Constants.KEY_SESSION, data);
        }
        setAccessToken(data.accessToken);
        setLoginData(data);
        onUserLogged(true);
        //registerForPushNotifications();
        await showBranding();
        props.history.push('/tabs/nutrition');
      } else {
        if (result&&result.data&&result.data.errors) {
          if (typeof result.data.errors === 'string') {
            onHandleToast(getInfoFormat(result.data.errors, false));
          } else {
            onHandleToast(getInfoFormat(result.data.errors[0], false));
          }
        } else {
          onHandleToast(getInfoFormat('Error occurred, Please try again', false));
        }
      }
    }
  }

  async function onLoginWithApple(props:any) {
    SignInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
      ]
    })
    .then((res: AppleSignInResponse) => {
      // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
      // alert('Send token to apple for verification: ' + res.identityToken);
      validateAppleToken(props, res.identityToken);
    })
    .catch((error: AppleSignInErrorResponse) => {
      alert(error.code + ' ' + error.localizedDescription);
      console.error(error);
    });
  }

  async function validateAppleToken(props:any, appleToken:string) {
    const reqData = {
      token: appleToken,
      isNeat: true
    };
    const url = `${Constants.baseUrl}${Method.loginApple}`;

    const result = await postApi(url, reqData);

    if (isSuccess(result)) {
      const data = result.data;
      setAccessToken(data.accessToken);
      const { isRememberMe } = state;
      if (isRememberMe) {
        await setStorage(Constants.KEY_SESSION, data);
      }
      setLoginData(data);
      onUserLogged(true);
      await showBranding();
      //registerForPushNotifications();
      props.history.push('/tabs/nutrition');
    } else {
      if (result&&result.data&&result.data.errors) {
        if (typeof result.data.errors === 'string') {
          onHandleToast(getInfoFormat(result.data.errors, false));
        } else {
          onHandleToast(getInfoFormat(result.data.errors[0], false));
        }
      } else {
        onHandleToast(getInfoFormat('Error occurred, Please try again', false));
      }
    }
  }

  return {
    onInputChange,
    onLoginSubmit,
    onPasswordAction,
    userData: state.userData,
    isPasswordHide: state.isPasswordHide,
    onForgotPassword,
    isForgotModal: state.isForgotModal,
    onForgotPasswordEmail,
    forgotEmail: state.forgotEmail,
    onReset,
    onSilentLogin,
    onRememberCheck,
    isRememberMe: state.isRememberMe,
    onLoginWithGoogle,
    onLoginWithApple
  };
};

export default LoginHook;
