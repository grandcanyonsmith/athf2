import { useContext } from 'react';
import { VersionContext } from '../context/versionContext';
import AppHook from './appHook';
import { getApi } from '../actions/http';
import Constants from '../constants/appConstants';
import Method from '../constants/methodConstants';
import { getTypePlatform, isSuccess } from '../actions/common';

const VersionHook = () => {
    const [state, setState] = useContext(VersionContext);
    const { onHandleToast } = AppHook();

    async function getVersionData() {
        const url = `${Constants.baseUrl}${getTypePlatform()? Method.versionios : Method.versionandroid}`;
        const result = await getApi(url);
        if ( isSuccess(result)) {
            const { data = []} = result;
            setState((stateObj:any) => ({
                ...stateObj,
                versionData: data
              }));
        }
    }

    function onItemSelect(index:number) {
        const { versionData } = state;
        versionData[index].isDisplay = !versionData[index].isDisplay;
        setState((stateObj:any) => ({
            ...stateObj,
            versionData
          }));
    }

    return {
        versionData: state.versionData,
        getVersionData,
        onItemSelect
    }
};

export default VersionHook;
