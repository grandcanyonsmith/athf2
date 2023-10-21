import { useContext } from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
import { ProfileContext } from '../context/profileContext';
import Constants from '../constants/appConstants';
import Method from '../constants/methodConstants';
import { getApi, putApi, postApi } from '../actions/http';
import { isSuccess, getGender, getInfoFormat, getSpecificFormatDate, formatProfilePic } from '../actions/common';
import AppHook from './appHook';
import NutritionHook from './nutritionHook';

const { Camera } = Plugins;

const ProfileHook = () => {
  const [state, setState] = useContext(ProfileContext);
  const { onHandleLoading, onHandleToast } = AppHook();
  const { setUserName } = NutritionHook();

  function onInputChange(data:any, key:string) {
    const { profileData }  = state;
    profileData[key] = data;
    if (key === 'gender') {
        profileData[`${key}_selected`] = getGender(data);
    }
    setState((stateObj:any) => ({
      ...stateObj,
      profileData: profileData
    }));
  }

  function onNext(isFirst: boolean) {
    setState((stateObj:any) => ({
      ...stateObj,
      isFirstSlide: isFirst
    }));
  }

  async function onSaveChanges() {
    onHandleLoading(true);
    const { profileData, profilePic }  = state;
    if (profilePic.indexOf(Constants.BASE_IMAGE_CHECK) !== -1) {
      const url = `${Constants.baseStageUrl}${Method.uploadprofilephoto}`;
      const imageUrl = profilePic;
      const formData = new FormData();
      formData.append("photo", DataURIToBlob(imageUrl), `${profileData.email}.jpg`);
      const result = await postApi(url, formData);
      if (!isSuccess(result)) {
        onHandleToast(getInfoFormat('Error while uploading image, Please check again', false));
      } else {
        profileData['avatar'] = result.data.avatar;
      }
    }
    
    const url = `${Constants.baseUrl}${Method.updateuser}`;
    // delete profileData.email;
    profileData['birthdate'] = getSpecificFormatDate(profileData['birthdate']);
    const response = await putApi(url, profileData);
    if (isSuccess(response)) { 
      setUserName(profileData.firstName);
      if (document) {
        const spec:any = document.getElementsByClassName('user-info');
        spec[0].firstElementChild.innerText = profileData.firstName;
      }
      onHandleToast(getInfoFormat('Profile updated successfully', true));
    } else {
      onHandleToast(getInfoFormat('Error occurred, Please try again', false));
    }
    onHandleLoading(false);
  }

  async function getUserData() {
    onHandleLoading(true);
    const url = `${Constants.baseUrl}${Method.getUser}`;
    const response = await getApi(url);
    if (isSuccess(response)) {
      const userProfileData = response.data[0];
      const obj = {
        'firstName': userProfileData['user.firstname'],
        'lastName': userProfileData['user.lastname'],
        'email': userProfileData['user.email'],
        'gender': userProfileData['gender'],
        'gender_selected': getGender(userProfileData['gender']),
        'birthdate': userProfileData['birthdate'],
        'address': userProfileData['address'],
        'city': userProfileData['city'],
        'state': userProfileData['state'],
        'postalcode': userProfileData['postalcode'],
        'mobilephone': userProfileData['mobilephone'],
        'aptsuite': userProfileData['aptsuite'],
        'homephone': userProfileData['homephone'],
        'avatar': userProfileData['avatar']
      };
      let picurl = '';
      if (userProfileData.avatar) {
        picurl = `${Constants.S3_IMAGE_URL}${userProfileData.avatar}`;
      } else {
        picurl = Constants.DEFAULT_PROFILE_PIC;
      }
      setState((stateObj:any) => ({
        ...stateObj,
        profileData: Object.assign({}, obj),
        profilePic: formatProfilePic(picurl)
      }));

      setTimeout(()=>{
        setState((stateObj:any) => ({
          ...stateObj,
          profileData: Object.assign({}, obj),
          isDisplaySelect: true
        }));
      });
      
    } else {
      onHandleToast(getInfoFormat('Failed to get profile data, Please try again', false));
    }
    onHandleLoading(false);
  }

//   function b64toBlob(b64Data:any, contentType:any, sliceSize:any) {
//     contentType = contentType || '';
//     sliceSize = sliceSize || 512;

//     var byteCharacters = atob(b64Data);
//     var byteArrays = [];

//     for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//         var slice = byteCharacters.slice(offset, offset + sliceSize);

//         var byteNumbers = new Array(slice.length);
//         for (var i = 0; i < slice.length; i++) {
//             byteNumbers[i] = slice.charCodeAt(i);
//         }

//         var byteArray = new Uint8Array(byteNumbers);

//         byteArrays.push(byteArray);
//     }

//   var blob = new Blob(byteArrays, {type: contentType});
//   return blob;
// }


// function imagetoblob(ImageURL:any){
// // Split the base64 string in data and contentType
// var block = ImageURL.split(";");
// // Get the content type of the image
// var contentType = block[0].split(":")[1];// In this case "image/gif"
// // get the real base64 content of the file
// var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

// // Convert it to a blob to upload
// return b64toBlob(realData, contentType, 512);
// }

function DataURIToBlob(dataURI: any) {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}

function calculateImageSize(base64String:any) {
  let padding;
  let inBytes;
  let base64StringLength;
  if (base64String.endsWith('==')) { padding = 2; }
  else if (base64String.endsWith('=')) { padding = 1; }
  else { padding = 0; }

  base64StringLength = base64String.length;
  console.log(base64StringLength);
  inBytes = (base64StringLength / 4) * 3 - padding;
  console.log(inBytes);
  const mbytes = inBytes / 1048576;
  return mbytes;
}

  async function getProfilePicture() {
    try {
      const image:any = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      })
      const imagedataurl = image.dataUrl.split(',');
      const size = calculateImageSize(imagedataurl[1]);
      if (size > 5) {
        onHandleToast(getInfoFormat("Image should be less than or equal to 5 MB", false));
        return false;
      }
      // console.log(size);
      // const url = `${Constants.baseUrl}${Method.uploadprofilephoto}`;
      // const imageUrl = image.dataUrl;
      // const formData = new FormData();
      // formData.append("photo", DataURIToBlob(image.dataUrl), '123.jpg');
      // const result = await postApi(url, formData);
      // const characterCount = imageUrl?.length;
      // base.substring(25 - 2, 2)
      setState((stateObj:any) => ({
        ...stateObj,
        profilePic: image.dataUrl
      }));
    } catch (ex) {
      console.log(ex);
    }
  }

  async function getstates() {
    const url = `${Constants.baseUrl}${Method.getstates}`;
    const result:any = await getApi(url);
    if (isSuccess(result)) {
      setState((stateObj:any) => ({
        ...stateObj,
        statesList: result.data
      }));
    }
  }

  function onErrorLoadImage() {
    const { profileData } = state;
    const imageUrl = `${Constants.WEB_IMAGE_URL}${profileData.avatar}`;
    setState((stateObj:any) => ({
      ...stateObj,
      profilePic: formatProfilePic(imageUrl)
    }))
  }

  return {
    profileData: state.profileData,
    isFirstSlide: state.isFirstSlide,
    isDisplaySelect: state.isDisplaySelect,
    onInputChange,
    onNext,
    onSaveChanges,
    getUserData,
    getProfilePicture,
    profilePic: state.profilePic,
    getstates,
    statesList: state.statesList,
    onErrorLoadImage
  };
};

export default ProfileHook;
