import { useContext } from 'react';
import { ImpersonateContext } from '../context/impersonateContext';
import Constants from '../constants/appConstants';
import Method from '../constants/methodConstants';
import { postApi, getApi } from '../actions/http';
import { isSuccess, getInfoFormat, setAccessToken, setLoginData, setActualLoggedInId } from '../actions/common';
import AppHook from './appHook';

const ImpersonateHook = () => {
    const [state, setState] = useContext(ImpersonateContext);
    const { onHandleToast, onImpersonated } = AppHook();


    const onUserSearch = async (ev:any) => {
        const { value } = ev.target;
        const url = `${Constants.baseUrl}${Method.getClients}`;
        const body = {
            fromIndex: 0,
            limit: 50,
            orderBy: "DESC",
            orderByOn: 'id',
            searchtext: value
        };
        const response = await postApi(url, body);

        if (isSuccess(response)) {
            const { rows = [], count = 0 } = response.data;

            setState((stateObj:any) => ({
                ...stateObj,
                usersResult: rows
              }));
          } else {
            const msg = response?.data?.msg || 'Error occurred, Please try again';
            onHandleToast(getInfoFormat(msg, false));
          }
    }

    const onUserSelect = async (item:any, props:any) => {
        const url = `${Constants.baseUrl}${Method.impersonate}/${item.id}`;
        const response = await getApi(url);
        const specData = response.data;
        setAccessToken(specData.accessToken);
        setActualLoggedInId(specData.companyAdminId);
        setLoginData(specData);
        props.history.push('/tabs/nutrition');
        onImpersonated(true);
    }

    return {
        onUserSearch,
        usersResult: state.usersResult,
        onUserSelect
    }
};

export default ImpersonateHook;
