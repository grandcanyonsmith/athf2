import { useContext } from 'react';
import { RefresherEventDetail, menuController } from '@ionic/core';
import { ExerciseContext } from '../context/exerciseContext';
import { postApi, deleteApi } from '../actions/http';
import Method from '../constants/methodConstants';
import Constants from '../constants/appConstants';
import { isSuccess, getInfoFormat, getValidateNumber, getWeeksList } from '../actions/common';
import AppHook from './appHook';
let spectimeval:any;
let exerciseCreateProgress:boolean = false;
const ExerciseHook = () => {
  const [state, setState] = useContext(ExerciseContext);
  const { onHandleLoading, onHandleToast } = AppHook();
  function onExerciseDate(value:any) {
    const dt = value.split('T')[0];
    const now = new Date(value);
    const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const selectedWeekList = getWeeksList(utcDate);

    setState((stateObj:any) => ({
      ...stateObj,
      exerciseDate: dt,
      weekList: selectedWeekList
    }));
  }

  function getHandledZero(val: any) {
    const specval = parseFloat(val);
    if (specval === 0) {
      return '';
    }
    return specval;
  }

  function getCompletedCount(data:any) {
    let completedCount = 0;
    data.forEach((item:any) => {
      let iscompleted = true;
      if (item.isSetDetails) {
        item.setdetails.forEach((spec:any) => {
          if (!spec.log_reps && !spec.log_weight) {
            iscompleted = false;
          }
          spec.log_reps = getHandledZero(spec.log_reps);
          spec.log_weight = getHandledZero(spec.log_weight);

        });
      } else {
        if (!item.log_heartrate && !item.log_duration) {
          item.log_heartrate = getHandledZero(item.log_heartrate);
          item.log_duration = getHandledZero(item.log_duration);
          iscompleted = false;
        }

      }
      if (iscompleted) {
        completedCount += 1;
        item.isCheckmarkDisplay = false; // set it to true to show tick mark
      } else {
        item.isCheckmarkDisplay = false;
      }
    });
    return {data, completedCount};
  }

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    const { exerciseDate, epedata } = state;

    getExerciseData(exerciseDate, true);
    setTimeout(()=>{
      event.detail.complete();
    }, 1000);
  }

  async function getExerciseData(date:string, isHandleDisplay:any) {
    onHandleLoading(true);
    const { exerciseDate, epedata } = state;
    const url =  `${Constants.baseUrl}${Method.getlogexercisesingle}`;
    const obj = {
      logdate: exerciseDate
    };
    const response:any = await postApi(url, obj);
    if (isSuccess(response)) {
      let specDisplayItems:any = [];
      if (!isHandleDisplay) {
        specDisplayItems = epedata.map((rec:any)=>(rec.isDisplay));
      }
      const plans = response.data[0].plans;
      const specepedata:any = [];
      plans.forEach((item:any, i:number) => {
        item.epe.forEach((spec:any, j:number) => {
          spec.exerciseplan_id = item.exerciseplan_id;
          spec.plan_name = item.plan_name;
          spec.isDisplay = isHandleDisplay ? ((i === 0 && j === 0) ? true: false) : specDisplayItems[i];
          spec.isSetDetails = spec.setdetails ? true : false;
          specepedata.push(spec);
        });

      });
      // const specepedata = response.data[0].plans[0].epe || [];
      // specepedata.forEach((item:any, i:number)=>{
      //   item.isDisplay = isHandleDisplay ? (i === 0 ? true: false) : specDisplayItems[i];
      //   item.isSetDetails = item.setdetails ? true : false;
      // });
      const resData = getCompletedCount(specepedata);
      setState((stateObj:any) => ({
        ...stateObj,
        completed: resData.completedCount,
        epedata: resData.data,
        exerciseplan_id: response.data[0].plans[0].exerciseplan_id ? response.data[0].plans[0].exerciseplan_id : -1,
        program_id: response.data[0].program_id,
        isDisplayProgressBar: false,
        isNoActiveProgram: false
      }));
    } else {
      const { data = {}} = response;
      if (data.message === 'No Active program' || data.message === 'Session details are not found') {
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
    exerciseCreateProgress = false;
    onHandleLoading(false);
  }

  async function updateexercisedata(data:any, index: number, j: number) {
    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayProgressBar: true,
    }));
    const { exerciseDate, exerciseplan_id, program_id } = state;
    if (data[index].isManualEntry) {
      console.log('Manual entry');
      const specdata = data[index];
      
      let obj = {
        "logdate": exerciseDate,
        "exercisetemplate_id": specdata.exercisetemplate_id,
        "cat_id": specdata.cat_id,
        "plan_name": specdata.plan_name,
        "name": specdata.name,
        "sets":1,
        "clientadded":1,
        "program_id": program_id,
        "data": []
      }
      if (specdata.isSetDetails) {
        obj.data = specdata.setdetails;
      }
      onHandleLoading(true);
      const url = `${Constants.baseUrl}${Method.createmanualentry}`;
      const result = await postApi(url, obj);
      if (isSuccess(result)) {
        getExerciseData(exerciseDate, false);
      } else {
        exerciseCreateProgress = false;
      }
    } else if ( !data[index].logexercisesingle_id ) {
      const url = `${Constants.baseUrl}${Method.exercisecreate}`;
      let logdata = [];
      if (data[index].isSetDetails) {
        logdata = data[index].setdetails.map((item:any) => ({
          log_weight: item.log_weight,
          log_reps: item.log_reps
        }));
      } else {
        const obj = {
          log_heartrate: data[index].log_heartrate,
          log_duration: data[index].log_duration
        };
        logdata.push(obj);
      }
      const reqData = {
        logdate: exerciseDate,
        program_id: program_id,
        clientadded: 1,
        exerciseplanexercise_id: data[index].exerciseplanexercise_id,
        data: logdata
      };
      onHandleLoading(true);
      const result = await postApi(url, reqData);
      if (isSuccess(result)) {
        getExerciseData(exerciseDate, false);
      } else {
        exerciseCreateProgress = false;
        onHandleLoading(false);
        const { error = '' } = result.data
        onHandleToast(getInfoFormat(error, false));
        setState((stateObj:any) => ({
          ...stateObj,
          isDisplayProgressBar: false
        }));
      }
    } else {
      const url = `${Constants.baseUrl}${Method.updateexercise}`;
      let specobj = {};
      if (data[index].isSetDetails) {
        if (data[index].setdetails[j].logexercisesingleset_id) {
          specobj = {
            logexercisesingleset_id: data[index].setdetails[j].logexercisesingleset_id,
            data: {
              log_weight: getValidateNumber(data[index].setdetails[j].log_weight),
              log_reps: getValidateNumber(data[index].setdetails[j].log_reps)
            }
          }
        } else {
          let recobj = data[index].setdetails[j];
          recobj.setiteration = data[index].setdetails.length;
          specobj = {
            "logexercisesingle_id": data[index].logexercisesingle_id,
            "isnewset": true,
            "data": recobj
          }
        }
      } else {
        specobj = {
          logexercisesingle_id: data[index].logexercisesingle_id,
          data: {
            log_heartrate: getValidateNumber(data[index].log_heartrate),
            log_duration: getValidateNumber(data[index].log_duration)
          }
        }
      }
      const result = await postApi(url, specobj);
      if (isSuccess(result)) {
        const { epedata } = state;
        const resData = getCompletedCount(data);

        const specresultdata = result.data.data;
        if (specresultdata) {
          epedata[index].setdetails[j].clientadded = specresultdata.clientadded;
          epedata[index].setdetails[j].logexercisesingleset_id = specresultdata.logexercisesingleset_id;
          console.log('Updated epedata');
          setState((stateObj:any) => ({
            ...stateObj,
            completed: resData.completedCount,
            epedata,
            isDisplayProgressBar: false
          }));
        } else {
          console.log('No need to Update epedata');
            setState((stateObj:any) => ({
              ...stateObj,
              completed: resData.completedCount,
              isDisplayProgressBar: false
            }));
      }
      } else {
        if (result && result.data) {
          const { error = '' } = result.data
          onHandleToast(getInfoFormat(error, false));
        } else {
          onHandleToast(getInfoFormat("Error occurred, Please try again", false));
        }

        exerciseCreateProgress = false;

        setState((stateObj:any) => ({
          ...stateObj,
          isDisplayProgressBar: false
        }));
      }
    }
  }

  function onItemQtyChange(ev:any, i:number, j:number, key: string) {
    const { epedata } = state;
    const value = ev.currentTarget.value;
    if (j === -1) {
      epedata[i][key] = isNaN(value) ? '' : value;
    } else {
      epedata[i].setdetails[j][key] = isNaN(value) ? '' : value;
    }

    setState((stateObj:any)=> ({
      ...stateObj,
      epedata
    }));

  }

  function onItemQty(ev:any, i:number, j:number, key: string) {
    // console.log('Reached');
    const { epedata } = state;
    const value = ev.currentTarget.value;
    if (j === -1) {
      epedata[i][key] = value;
    } else {
      epedata[i].setdetails[j][key] = value;
    }
    if (!epedata[i].logexercisesingle_id) {
      // clearTimeout(exerciseCreateProgress);
      // exerciseCreateProgress = setTimeout(()=>{
        if (!exerciseCreateProgress) {
          exerciseCreateProgress = true;
          updateexercisedata(epedata, i, j);
        }
      // }, 1000);
      onHandleLoading(true);
    } else {
      updateexercisedata(epedata, i, j);
    }
  }

  function onChangeQty(isAdd:any, i:number, j:number, key:string) {
    const { epedata } = state;
    if (j === -1) {
      let existingvalue = (isNaN(epedata[i][key]) || epedata[i][key].length === 0) ? 0 : parseInt(epedata[i][key]);
      existingvalue = isAdd ? existingvalue + 1 : existingvalue - 1;
      if (existingvalue > 0) {
        epedata[i][key] = existingvalue;
      }
    } else {
      let existingvalue = (isNaN(epedata[i].setdetails[j][key]) || epedata[i].setdetails[j][key].length === 0) ? 0 : parseInt(epedata[i].setdetails[j][key]);
      existingvalue = isAdd ? existingvalue + 1 : existingvalue - 1;
      if (existingvalue > 0) {
        epedata[i].setdetails[j][key] = existingvalue;
      }
    }
    setState((stateObj:any)=> ({
      ...stateObj,
      epedata: epedata
    }));
    // updateexercisedata(epedata, i, j);
  }

  function onAddSet(i:any) {
    const { epedata } = state;
    let obj:any = {};
    const setdata = epedata[i].setdetails;
    if (setdata.length > 0) {
      obj = JSON.parse(JSON.stringify(setdata[0]));
    }
    delete obj.logexercisesingleset_id;
    obj.log_reps = "";
    obj.log_weight = "";
    epedata[i].setdetails.push(obj);
    setState((stateObj:any)=> ({
      ...stateObj,
      epedata: epedata
    }));
  }

  function onExerciseInfo(isDisplay: any, index: any = -1) {
    const { epedata } = state;
    const data = epedata[index] || {name: '', video_url: ''};
    setState((stateObj:any)=> ({
      ...stateObj,
      isDisplayExerciseInfo: isDisplay,
      videoData: {
        name: data.name,
        video_url: data.video_url
      }
    }));
  }

  function addNotes(isDisplay: boolean, i:any = -1) {
    //debugger;
    const { epedata } = state;

    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayNotes: isDisplay,
      notesIndex: i,
      notes: '',
      selectednote: i !== -1 ? epedata[i].clientnote : ''
    }));
  }

  function onNotesChange(text:string) {
    setState((stateObj:any) => ({
      ...stateObj,
      notes: text
    }));
  }

  async function onSaveNotes() {
    const { notes, notesIndex, epedata, selectednote = '' } = state;
    if (notes.length === 0) {
      onHandleToast(getInfoFormat('Notes should not be empty', false));
      return false;
    }


    const data = epedata[notesIndex];
    let obj:any = {};
    const url:string = `${Constants.baseUrl}${Method.updateexercise}`;
    let resultnote = notes;
    if (selectednote && selectednote.length > 0) {
      resultnote += "\n" + selectednote; 
    }
    if (!data.logexercisesingle_id) {

      return false;
    }
    onHandleLoading(true);

    const reqData = {
      "logexercisesingle_id": data.logexercisesingle_id,
      "data": {
        "clientnote": resultnote
      }
    }
    const resultant = await postApi(url, reqData);
    if (isSuccess(resultant)) {
      epedata[notesIndex].clientnote = resultnote;
      setState((stateObj:any) => ({
        ...stateObj,
        notes: '',
        selectednote: resultnote,
        epedata
      }));
      onHandleToast(getInfoFormat("Notes saved successfully", true));
    } else {
      onHandleToast(getInfoFormat("Error while saving notes, Please try again", false));
    }

    onHandleLoading(false);

  }

  function addExercise(isDisplay:boolean) {
    setState((stateObj:any)=>({
      ...stateObj,
      isDisplayAddExercise: isDisplay,
      searchExercise: '',
      selectedExercise: {},
      exerciseData: []
    }));
  }

  async function fetchSearchedExercise(searchExercise:string = '') {
    if (searchExercise.length === 0) {
      return false;
    }
    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayExerciseLoader: true
    }))
    const url = `${Constants.baseUrl}${Method.searchexercises}`;
    const reqData = {
      exercise: searchExercise
    }
    const result = await postApi(url, reqData);
    if (isSuccess(result)) {
      setState((stateObj:any) => ({
        ...stateObj,
        exerciseData: result.data,
        isNoRecordsExercise: result.data.length > 0 ? false : true,
        isDisplayExerciseLoader: false
      }))
    }
  }

  async function onSearchExercise(text: any) {
    setState((stateObj:any)=>({
      ...stateObj,
      searchExercise: text
    }));

    clearTimeout(spectimeval);
    spectimeval = setTimeout(()=>{
      fetchSearchedExercise(text);
    }, 1000)

  }

  function onSelectExerciseItem(item:any) {
    setState((stateObj:any)=>({
      ...stateObj,
      selectedExercise: item
    }));
  }

  function onAddExerciseNew() {
    // console.log("Reached");
    const { epedata, selectedExercise } = state;
    const len = epedata.length;
    let obj:any = {
      // "logdate":"2020-11-25",
      isManualEntry: true,
      "exercisetemplate_id": selectedExercise.id,
      "cat_id": selectedExercise.exercisetemplatecategory_id,
      "plan_name": epedata[ len - 1] ? epedata[ len - 1].plan_name : '',
      "name": selectedExercise.name,
      "sets":1,
      "clientadded":1,
      // "program_id":5128,
      // "data": [{"weight":"","reps":"","log_weight":2, "log_reps":32}]
      }

      if (selectedExercise.exercisetemplatecategory_id === 1) {
        obj.heartrate = 0;
        obj.duration = 0;
        obj.log_heartrate = "";
        obj.duration = "";
        obj.isSetDetails = false;
      } else {
        obj.reps = 0;
        obj.rest = 0;
        obj.sets = 0;
        obj.speed = 0;
        const arr = [
          {
            reps: 0,
            rest: 0,
            speed: 0,
            log_reps: "",
            log_weight: ""
          }
        ]
        obj.setdetails = arr;
        obj.isSetDetails = true;
      }
      epedata.push(obj);
      setState((stateObj:any)=>({
        ...stateObj,
        epedata: epedata
      }));
      addExercise(false);
      updateexercisedata(epedata, epedata.length - 1, 0);
  }


  function onExerciseSpecSelect(index:number) {
    const { epedata } = state;
    epedata[index].isDisplay = !epedata[index].isDisplay; 
    setState((stateObj:any)=>({
      ...stateObj,
      epedata: epedata
    }));
  }

  function handleOnDelete(i:number, j:number) {
    const { epedata } = state;
    epedata[i].setdetails.splice(j,1);
    setState((stateObj:any)=>({
      ...stateObj,
      epedata: epedata
    }));
    onExerciseSpecSelect(i);
    onExerciseSpecSelect(i);
  }

  async function onDeleteSet (i:number, j:number) {
    onHandleLoading(true);
    const { epedata } = state;
    const singlesetid = epedata[i].setdetails[j].logexercisesingleset_id;

    if (singlesetid) {
      const url = `${Constants.baseUrl}${Method.deletelogexercisesingleset}${singlesetid}`;
      const result = await deleteApi(url);
      if (isSuccess(result)) {
        handleOnDelete(i, j);
      }
    } else {
      handleOnDelete(i, j);
    }
    onHandleLoading(false);
  }

  function handleOnExerciseDelete(i:number) {
    const { epedata } = state;

    epedata.splice(i,1);
    setState((stateObj:any)=>({
      ...stateObj,
      epedata: epedata
    }));
  }

  async function onExerciseDelete(i:number) {
    onHandleLoading(true);
    const { epedata } = state;
    const singlesetid = epedata[i].logexercisesingle_id;
    if (singlesetid) {
      const url = `${Constants.baseUrl}${Method.deletelogexercisesingle}${singlesetid}`;
      const result = await deleteApi(url);
      if (isSuccess(result)) {
        handleOnExerciseDelete(i);
      } else {
        onHandleToast(getInfoFormat("Error while deleting exercise, Please try again", false));
      }
    } else {
      handleOnExerciseDelete(i);
    }
    onHandleLoading(false);
  }

  function initiateWeekList() {
    const weeksListInfo = getWeeksList(new Date());
    setState((stateObj:any)=>({
      ...stateObj,
      weekList: weeksListInfo
    }));
  }

  function toggleMenu() {
    menuController.toggle();
  }

  return {
    exerciseDate: state.exerciseDate,
    onExerciseDate,
    onItemQty,
    onChangeQty,
    isDisplayNotes: state.isDisplayNotes,
    addNotes,
    onNotesChange,
    notes: state.notes,
    onSaveNotes,
    isDisplayExerciseInfo: state.isDisplayExerciseInfo,
    onExerciseInfo,
    onAddSet,
    isDisplayAddExercise: state.isDisplayAddExercise,
    addExercise,
    onSearchExercise,
    searchExercise: state.searchExercise,
    exerciseData: state.exerciseData,
    onSelectExerciseItem,
    selectedExercise: state.selectedExercise,
    getExerciseData,
    epedata: state.epedata,
    notesIndex: state.notesIndex,
    selectednote: state.selectednote,
    exerciseplan_id: state.exerciseplan_id,
    program_id: state.program_id,
    onAddExerciseNew,
    onDeleteSet,
    completed: state.completed,
    onExerciseSpecSelect,
    doRefresh,
    onExerciseDelete,
    videoData: state.videoData,
    isNoRecordsExercise: state.isNoRecordsExercise,
    isDisplayExerciseLoader: state.isDisplayExerciseLoader,
    isDisplayProgressBar: state.isDisplayProgressBar,
    onItemQtyChange,
    isNoActiveProgram: state.isNoActiveProgram,
    initiateWeekList,
    toggleMenu,
    weekList: state.weekList
  };
};

export default ExerciseHook;
