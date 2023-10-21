import { useContext } from 'react';
import { GoalsContext } from '../context/goalsContext';
import { getApi } from '../actions/http';
import Method from '../constants/methodConstants';
import Constants from '../constants/appConstants';
import { isSuccess, getFormatedValue, getGoalPercent, getInfoFormat } from '../actions/common';
import AppHook from './appHook';

const GoalsHook = () => {
  const [state, setState] = useContext(GoalsContext);
  const { onHandleLoading, onHandleToast } = AppHook();

  function getGraphData (specdata:any) {
    const weightData:any = [];
    const bodyFatData:any = [];
    const leanMuscleData:any = [];
    specdata.goal_weights_data.forEach((item:any, i:any) => {
      
      const dt = getFormatedValue(item.measured_at);
      weightData.unshift(
        {
          'primary' : dt,
          'secondary': item.weight
        }
      );
      bodyFatData.unshift(
        {
          'primary' : dt,
          'secondary': item.bodyfat
        }
      );
      leanMuscleData.unshift(
        {
          'primary' : dt,
          'secondary': item.leanmuscle
        }
      );
    });
    return {
      weightData,
      bodyFatData,
      leanMuscleData
    }
    // [{"primary": new Date("2021-01-21"),"secondary":2},{"primary":new Date("2021-01-22"),"secondary":77},{"primary":new Date("2021-01-23"),"secondary":44},{"primary":new Date("2021-01-24"),"secondary":66},{"primary":new Date("2021-01-25"),"secondary":78},{"primary":new Date("2021-01-26"),"secondary":53},{"primary":new Date("2021-01-27"),"secondary":66},{"primary":new Date("2021-01-28"),"secondary":8}]
  }

  async function getGoalsData () {
    onHandleLoading(true);
    const url = `${Constants.baseUrl}${Method.dashboard}`;
    const response = await getApi(url);
    if (isSuccess(response)) {
      const { data } = response;
      data.goalweight_percent = isNaN(data.goalweight_percent) ? 0 : data.goalweight_percent;
      data.goalbodyfat_percent = isNaN(data.goalbodyfat_percent) ? 0 : data.goalbodyfat_percent;
      data.goalmusclegain_percent = isNaN(data.goalmusclegain_percent) ? 0 : data.goalmusclegain_percent;
      const graphData = getGraphData(data);
      data.weight_graph = [{"label":"Weight Series","data": graphData.weightData}]
      data.bodyfat_graph = [{"label":"Weight Series","data": graphData.bodyFatData}]
      data.musclegain_graph = [{"label":"Weight Series","data": graphData.leanMuscleData}]
      data.completed = getGoalPercent(data);
      //data.weight_graph = [{"label":"Series 1","data":[{"primary": new Date("2021-01-21"),"secondary":2},{"primary":new Date("2021-01-22"),"secondary":77},{"primary":new Date("2021-01-23"),"secondary":44},{"primary":new Date("2021-01-24"),"secondary":66},{"primary":new Date("2021-01-25"),"secondary":78},{"primary":new Date("2021-01-26"),"secondary":53},{"primary":new Date("2021-01-27"),"secondary":66},{"primary":new Date("2021-01-28"),"secondary":8}]}];
      // const lostweight = data.goalweight_start - data.mostrecent_weight;
      // const lostbodyfat = data.goalbodyfat_start - data.mostrecent_bodyfat;
      // const gainedmuscle = data.mostrecent_leanmuscle - data.goalmusclegain_start; 
      // data.lostweight = lostweight.toFixed(2);
      // data.lostbodyfat = lostbodyfat.toFixed(2);
      // data.gainedmuscle = gainedmuscle.toFixed(2);
      // const weeks = noOfWeeks(data.goal_start_date, data.goal_end_date);
      // const weightgoal = data.goalweight_start - data.goalweight;
      // const bodyfatrgoal = data.goalbodyfat_start - data.goalbodyfat;
      // const musclegoal = data.goalmusclegain - data.goalmusclegain_start;
      // data.weightweekly = weeks === 0 ? 0 :((weightgoal) / weeks).toFixed(2);
      // data.bodyfatweekly = weeks === 0 ? 0 :((bodyfatrgoal) / weeks).toFixed(2);
      // data.muscleweekly = weeks === 0 ? 0 :(musclegoal / weeks).toFixed(2);

      // data.weight_percent = Math.round((lostweight/weightgoal) * 100 );
      // data.bodyfat_percent = Math.round((lostbodyfat/bodyfatrgoal) * 100 );
      // data.muscle_percent = Math.round((gainedmuscle/musclegoal) * 100 );

      setState((stateObj:any) => ({
        ...stateObj,
        goalsData: data
      }));
    } else {
      const { data = {}} = response;
      if (data.message === 'User does not have an active program.') {
        setState((stateObj:any) => ({
          ...stateObj,
          isNoActiveProgram: true
        }));
      } else if (data.message) {
        onHandleToast(getInfoFormat(data.message, false));
      } else {
        onHandleToast(getInfoFormat("Error occurred, Please try again", false));
      }
    }
    onHandleLoading(false);
  }

  function onToggleGraph(key:string) {
    const { goalsData } = state;
    goalsData[key] = !goalsData[key];
    setState((stateObj:any) => ({
      ...stateObj,
      goalsData: goalsData
    }));
  }

  return {
    getGoalsData,
    goalsData: state.goalsData,
    onToggleGraph,
    isNoActiveProgram: state.isNoActiveProgram
  };
};

export default GoalsHook;
