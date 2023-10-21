import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonIcon, IonItem, IonLabel, IonCheckbox, IonButton } from '@ionic/react';
import { logoApple, logoGoogle } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import InputContainer from '../../components/inputContainer/inputContainer';
import LoginHook from '../../hooks/loginHook';
import './Login.css';
import ForgotModal from '../../components/forgot';
import Button from '../../components/button';
import { trackGAView } from '../../actions/common';

const Login: React.FC = (props: any) => {

  const { name } = useParams<{ name: string; }>();
  const { onLoginSubmit, onPasswordAction, isPasswordHide, onInputChange, userData, isForgotModal, onForgotPassword,
    forgotEmail, onForgotPasswordEmail, onReset, onSilentLogin, onRememberCheck, onLoginWithGoogle, onLoginWithApple } = LoginHook();
    useEffect(() => {
      onSilentLogin(props);
      trackGAView('Login screen');
    }, []);
  return (
    <IonPage>
      <IonContent fullscreen class="background-image">
        <div className="container login-div">
          <IonImg class="img-size" src='../../assets/thf.png' />
          <InputContainer label={"Email"} text={userData.email} specCls="bg-dark" typekey="email" inputChange={onInputChange} />
          <InputContainer label={"Password"} text={userData.password} specCls="bg-dark" typekey="password" inputType={isPasswordHide ? 'password' : 'text'} isTypePassword={true} passwordAction={onPasswordAction} inputChange={onInputChange} />
          <IonItem lines="none" color="bgtrans" class="remember-me">
            <IonCheckbox class="remembercheck" color="success" onClick={(ev)=>{onRememberCheck(ev)}}/>
            <IonLabel class="remember-me">Remember Me</IonLabel>
          </IonItem>
          <Button text='Log In' onAction={()=>{onLoginSubmit(props)}} />
          <IonItem lines="none" class="forgot" color="bgtrans">
            <IonLabel color="dark" class="ion-margin forgot"
            onClick={() => { onForgotPassword(true) }}
            >Forgot your password?</IonLabel>
          </IonItem>

          <IonButton class="round" expand="block" color="light"
              onClick={() => { onLoginWithGoogle(props) }}
          >
            <IonIcon icon={logoGoogle}></IonIcon>
              <IonLabel class="lbl-padding">Login with Google</IonLabel>
          </IonButton>
          <IonButton class="round" expand="block" color="light"
              onClick={() => { onLoginWithApple(props) }}
          >
            <IonIcon icon={logoApple}></IonIcon>
              <IonLabel class="lbl-padding">Login with Apple</IonLabel>
          </IonButton>
          <ForgotModal showModal={isForgotModal} onForgotPassword={onForgotPassword} forgotEmail={forgotEmail} onForgotPasswordEmail={onForgotPasswordEmail} onReset={onReset} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
