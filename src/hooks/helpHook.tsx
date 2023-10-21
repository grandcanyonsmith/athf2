import { useContext } from 'react';
import { HelpContext } from '../context/helpContext';
import { getAppVersion, textCopyToClipboard, getInfoFormat } from '../actions/common';
import AppHook from './appHook';

const HelpHook = () => {
    const [state, setState] = useContext(HelpContext);
    const { onHandleToast } = AppHook();

    async function getCurrentAppVersion() {
        const result = await getAppVersion();
        setState((stateObj:any) => ({
            ...stateObj,
            appVersion: result
          }));
    }

    async function copyText(txt:any) {
        await textCopyToClipboard(txt);
        onHandleToast(getInfoFormat("Copied to clipboard", true));
    }

    function routeToFeedback(props:any) {
        props.history.push('/page/feedback');
    }

    function routeToVersionHistory(props:any) {
        props.history.push('/page/version');
    }

    return {
        appVersion: state.appVersion,
        getCurrentAppVersion,
        copyText,
        routeToFeedback,
        routeToVersionHistory
    }
};

export default HelpHook;
