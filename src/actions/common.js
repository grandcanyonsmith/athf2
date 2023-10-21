import "@capacitor-community/uxcam"
import { Plugins } from '@capacitor/core';
import { isPlatform } from '@ionic/react';
// import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics';
import { AppVersion } from '@ionic-native/app-version';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import Method from '../constants/methodConstants';
import Constants from '../constants/appConstants';
import { postApi } from './http';

import { Market  } from '@ionic-native/market';

// import { EmailComposer } from '@ionic-native/email-composer';
// import { Keyboard } from '@ionic-native/keyboard';
const { Storage, Clipboard, Keyboard, PushNotifications, LocalNotifications, UXCamPlugin } = Plugins;

//FirebaseCrashlytics.initialise();

let accessToken = '';
let loggedData = {};
let userEmail = '';
let loggedId = '';

let isNotificationRegistered = false;

let isUserIdentitySet = false;
let isStartedUxcamTracking = false;
// let pushNotificationValue = '';

export const logException = (msg) => {
    //FirebaseCrashlytics.logException(msg);
    //FirebaseCrashlytics.crash();
}

export const setUserEmail = (email) => {
    userEmail = email;
};

export const getUserEmail = () => {
    return userEmail;
};

export const setLoginData = (data) => {
    loggedData = data;
    setPropertiesforUXCam(data.userid);
};

export const getLoginData = () => {
    return loggedData;
};

export const setAccessToken = (token) => {
    accessToken = token;
};

export const setActualLoggedInId = (userLoggedId) => {
    loggedId = userLoggedId;
    setPropertiesforUXCam(loggedId);
};

export const getActualLoggedInId = () => {
    return loggedId;
}

export const getAccessToken = () => {
    if (accessToken) {
        return `Bearer ${accessToken}`;
    }
    return '';
}

const formatValue = (val) => {
    if (parseInt(val) < 10) {
        return `0${val}`;
    }
    return val;
}

export const getMaxAllowedDate = () => {
    const dt = new Date();
    const resultant = `${dt.getFullYear() - 3}-${formatValue(dt.getMonth() + 1)}-${formatValue(dt.getDate())}`;
    return resultant;
}

export const getProgressExercise = (completed, total) => {
    if (completed > total) {
        return 0;
    }
    const progress = (completed / total) * 100;
    return isNaN(progress) ? 0 : parseInt(progress);
}

export const isSuccess = (data) => {
    if (data.status !== 200 && data.status !== 201) {
        return false;
    }
    return true;
};

export const getInfoFormat = (msg, type) => {
    return {
        isDisplay: true,
        msg: msg,
        isSuccess: type
    }
};

export const setStorage = async (key, value) => {
    await Storage.set({
        key: key,
        value: JSON.stringify(value)
      });    
}

export const getStorage = async (key) => {
    const ret = await Storage.get({ key: key });
    return JSON.parse(ret.value);
}

export const clearStorage = async () => {
    await Storage.clear();
    return true;
};

export const getGender = (info) => {
    if (info) {
        return info === 'm'? 'Male' : 'Female';
    }
    return '';
}

export const getSpecificFormatDate = (btdt) => {
    if (btdt) {
        const dt = new Date(btdt);
        return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
    }
    return '';
}

export const getTodayDate = () => {
    const dt = new Date();
    const specformat = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}`;
    return specformat;
   // return '07-10-2020';//specformat;
}

export const tConvert = (time) => {
    const spectime = time.split(':');
    spectime.pop();
    if (spectime[0] < 10) {
        spectime[0] = `0${parseInt(spectime[0])}`;
    }
    time = spectime.join(':');
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

export const getToggleValue = (isChecked) => {
    return isChecked? 1:0;
};

export const noOfWeeks = (start, end) => {
    const startsplit = start.split('T')[0];
    const endsplit = end.split('T')[0];

    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(startsplit);
    const endDate = new Date(endsplit);

    const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay));
    return Math.round(diffDays / 7);
}

export const getTypePlatform = () => {
    return isPlatform('ios');
}

const formatNum = (val) => {
    if (parseInt(val) < 10) {
        return `0${val}`;
    } else {
        return val;
    }
}

export const getFormatedValue = (dt) => {
    const dtv = new Date(dt);
    return `${formatNum(dtv.getMonth() + 1)} / ${formatNum(dtv.getDate())}`;
};

export const formatPercent = (num) => {
    const numVal = num.toString();
    if (numVal.indexOf('.') > 0) {
        return num.toFixed(2);
    }
    return num;
};

export const getGoalPercent = (item)=> {
    const date1 = new Date(item.goal_start_date);
    const date2 = new Date(item.goal_end_date);
    const diffTime = Math.abs(date2 - date1);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    const current = new Date();
    const difftimeCurrent = Math.abs(current - date1);
    const diffDaysCurrent =  Math.ceil(difftimeCurrent / (1000 * 60 * 60 * 24)); 

    let percent =  0;
    if (diffDaysCurrent > diffDays) {
        percent = 100;
    } else {
        percent = (diffDaysCurrent / diffDays) * 100;
    }

    return formatPercent(percent);
}

// export const getAppVersion = async () => {
//     // try {
//     //     const result = await AppVersion.getVersionNumber();
//     //     return result;
//     // } catch (ex) {
//     //     console.log(ex);
//     //     return '';
//     // }
//     return '';
// }

export async function getAppVersion () {
    try {
        const result = await AppVersion.getVersionNumber();
        return result;
    } catch (ex) {
        console.log(ex);
        return '2';
    }
}

export const getPercent = (a,b) => {
    const result = (a/b) * 100;
    //return Math.round(result);
    return result <= 100 ? result : 100.1;
};

export const getItemClass = (val) => {
    if (val <= 89) {
        return 'nutri-orange';
    } else if (val >= 90 && val <= 100) {
        return 'nutri-green';
    }
    return 'nutri-red';
};

export const launchApp = () => {
    const appId = getTypePlatform() ? Constants.IOS_PACKAGE_NAME : Constants.ANDROID_PACKAGE_NAME;
    Market.open(appId);
}
export const formatNumber = (val) => {
    if (val.toString().indexOf('.') === -1) {
        return parseFloat(val);
    }
    return parseFloat(parseFloat(val).toFixed(2));
}

export const roundValue = (val) => {
    return isNaN(val) ? 0 : Math.round(val);
};

export const textCopyToClipboard = async (txt) => {
    await Clipboard.write({
        string: txt
      });
    //console.log('Got', result.type, 'from clipboard:', result.value);
};

export const getValidateNumber = (value) => {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
        return 0;
    }
    return value;
};

const specificDateFormat = (day, dt, isSelected) => {
    dt.setDate(dt.getDate() + day)
    return {
        day: formatNum(dt.getDate()),
        weekName: Constants.WEEKDAYS[dt.getDay()],
        date: `${dt.getFullYear()}-${formatNum(dt.getMonth() + 1)}-${formatNum(dt.getDate())}`,
        selected: !!isSelected
    };
};

export const getWeeksList = (selectedDate) => {
    const list = [
        specificDateFormat(-3, selectedDate),
        specificDateFormat(1, selectedDate),
        specificDateFormat(1, selectedDate),
        specificDateFormat(1, selectedDate, true),
        specificDateFormat(1, selectedDate),
        specificDateFormat(1, selectedDate),
        specificDateFormat(1, selectedDate)
    ];
    return list;
};

export const getUpdatedWeekList = (list, value) => {
    list.forEach(item => {
        if (item.date === value) {
            item.selected = true;
        } else {
            item.selected = false;
        }
    });
    return list;
}

export const sendEmailComposer = (data) => {
    // EmailComposer.open(data);
};

export const handleKeyboardDisplay = (isDisplay) => {
    if (!isDisplay) {
        Keyboard.hide();
    }
};

export const formatProfilePic = (picurl) => {
   const time = new Date().getTime();
    return `${picurl}?t=${time}`;
};

export const stractTrackingGA = () => {
    const gaID = getTypePlatform() ? Constants.IOS_GA_ID : Constants.ANDROID_GA_ID;
    GoogleAnalytics.startTrackerWithId(gaID)
    .then(() => {
      console.log('Google analytics is ready now');
      GoogleAnalytics.trackView('App Launched');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    })
    .catch(e => {
        console.log('Error starting GoogleAnalytics', e)
    });
 
}

export const trackGAEvent = (category, action, label) => {
    GoogleAnalytics.trackEvent(category, action, label);
}

export const trackGAView = (title) => {
    GoogleAnalytics.trackView(title);
}

export const startUXCAMTracking = () => {
    // UXCamPlugin.optIntoSchematicRecordings(); /* To enabled session video recording on iOS */
    if(isPlatform('ios') || isPlatform('android')) {
        if (!isStartedUxcamTracking) {
            isStartedUxcamTracking = true;
            UXCamPlugin.startWithKey({ UXCamKey: 'b9lbwqegboe8q3w' });
            UXCamPlugin.setMultiSessionRecord({ recordMultipleSessions: true });
        }
    }
}

const setPropertiesforUXCam = (loggedId) => {
    if(isPlatform('ios') || isPlatform('android')) {
        if (!isUserIdentitySet) {
            isUserIdentitySet = true;
            UXCamPlugin.setUserIdentity({ userIdentity: `${loggedId}` });
        }
    }
};

const savePushNotification = async (token) => {
    const url = `${Constants.baseUrl}${Method.pushnotification}`;
    
    const reqData = {
    }
    if (getTypePlatform()) {
        reqData.ios = token
    } else {
        reqData.android = token;
    }
    const data = await postApi(url, reqData);
}

export const registerForPushNotifications = () => {
    //savePushNotification('123');
    if (isNotificationRegistered) {
        return false;
    }
    PushNotifications.requestPermission().then((permission) => {
        if (permission.granted) {
            isNotificationRegistered = true;
            console.log('Permission granted');
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
            console.log('Permission not granted');
          // No permission for push granted
        }
      });

    // On succcess, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token) => {
        savePushNotification(token.value);
        console.log('Push registration success, token: ' + token.value);
        // alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with your setup and push will not work
    PushNotifications.addListener('registrationError',
      (error) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
        async (notification) => {
            console.log('scheduled notifications', JSON.stringify(notification));

        const notifs = await LocalNotifications.schedule({
            notifications: [
              {
                title: notification.title,
                body: notification.body,
                id: new Date().getTime(),
                schedule: { at: new Date(Date.now() + 1000 * 5) },
                sound: null,
                attachments: null,
                actionTypeId: "",
                extra: null,
                icon: "https://www.totalhealthandfitness.com/wp-content/uploads/2018/11/cropped-Icon-32x32.png",
                smallIcon: "https://www.totalhealthandfitness.com/wp-content/uploads/2018/11/cropped-Icon-32x32.png"
              }
            ]
          });
          console.log('scheduled notifications', notifs);
        // let notif = this.state.notifications;
        // notif.push({ id: notification.id, title: notification.title, body: notification.body })
        // this.setState({
        //   notifications: notif
        // })
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification) => {
        // let notif = this.state.notifications;
        // notif.push({ id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body })
        // this.setState({
        //   notifications: notif
        // })
      }
    );
};