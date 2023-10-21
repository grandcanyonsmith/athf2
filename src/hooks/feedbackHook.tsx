import { useContext } from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
import { FeedbackContext } from '../context/feedbackContext';
import { getUserEmail } from '../actions/common';
import AppHook from './appHook';
import { postApi } from '../actions/http';
import Method from '../constants/methodConstants';
import Constants from '../constants/appConstants';
import { isSuccess, getInfoFormat } from '../actions/common';

const { Camera } = Plugins;

// import { sendEmailComposer } from '../actions/common';

const FeedbackHook = () => {
    const [state, setState] = useContext(FeedbackContext);
    const { onHandleToast, onHandleLoading } = AppHook();

    function setMessage(value:string) {
        setState((stateObj:any)=>({
            ...stateObj,
            message: value
          }));
    }

    async function onSendFeedback(props:any) {
        const { message, imagesList } = state;
        onHandleLoading(true);
        const userEmail = getUserEmail();
        // const obj = {
        //   from: userEmail,
        //   content: message,
        //   images: imagesList
        // }

        const url = `${Constants.baseStageUrl}${Method.sendfeedback}`;

        const attachmentsArr = imagesList.map((value:string)=> ({
          bufferdata: value.split('base64,')[1]
        }));
        const reqData = {
          from: userEmail,
          msg:message,
          attachments:attachmentsArr
        };

        const result = await postApi(url, reqData);

        if (isSuccess(result)) {
          // console.log('Reached');
          onHandleToast(getInfoFormat("Feedback submitted successfully", true));
          props.history.goBack();
        } else {
          onHandleToast(getInfoFormat("Error occurred, Please try again", false));
        }
        onHandleLoading(false);

    }

    async function onAttachImage() {
        const { imagesList } = state;

        const image:any = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl
          })
          const imagedataurl = image.dataUrl
          imagesList.push(imagedataurl);
          setState((stateObj:any)=>({
            ...stateObj,
            imagesList
          }));
    }

    function onRemoveImage(index:number) {
        const { imagesList } = state;
        imagesList.splice(index, 1);
        setState((stateObj:any)=>({
            ...stateObj,
            imagesList
          }));
    }

    return {
        setMessage,
        message: state.message,
        onSendFeedback,
        onAttachImage,
        imagesList: state.imagesList,
        onRemoveImage
    }
};

export default FeedbackHook;
