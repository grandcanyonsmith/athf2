import { useContext } from 'react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RefresherEventDetail, menuController } from '@ionic/core';
import { NutritionContext } from '../context/nutritionContext';
import { getApi, postApi, deleteApi } from '../actions/http';
import Method from '../constants/methodConstants';
import Constants from '../constants/appConstants';
import { isSuccess, getInfoFormat, tConvert, getToggleValue, getPercent, getItemClass, formatNumber, roundValue, setUserEmail, handleKeyboardDisplay, getWeeksList, getUpdatedWeekList } from '../actions/common';
import AppHook from './appHook';

let foodTimeValue:any;
let nutritionFoodItem = false;
const NutritionHook = () => {
  const [state, setState] = useContext(NutritionContext);
  const { onHandleLoading, onHandleToast } = AppHook();

  function diningout() {
    console.log('Dining out');
  }

  async function onDeleteRecord(i:number,j:number) {
    console.log("Deleted");
    onHandleLoading(true);
    const { nutritionData } = state;
    const { lognutritionsingle_id, lognutritionsinglefoods_id } = nutritionData[i].foods[j];
    const url = `${Constants.baseUrl}${Method.deletenutritionsinglefood}${lognutritionsingle_id}/${lognutritionsinglefoods_id}`;
    const result = await deleteApi(url);
    if (isSuccess(result)) {
      nutritionData[i].foods.splice(j, 1);
      nutritionData[i] = getCalculatedValues(nutritionData[i]);
      setState((stateObj:any) => ({
        ...stateObj,
        nutritionData: nutritionData
      }));
      getTotals(nutritionData);
    }
    
    handleDisplayData(i);
    handleDisplayData(i);

    onHandleLoading(false);
  }

  async function onBarCodeAction(mealIndex:number = -1) {
    console.log("On bar code action");
    const data:any = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);
    if (mealIndex === -1) {
      setState((stateObj:any) => ({
        ...stateObj,
        searchFood: '',
        selectedFood: []
      }));
    } else {
      setState((stateObj:any) => ({
        ...stateObj,
        searchFood: '',
        selectedFood: [],
        mealIndex
      }));
    }
    if (data && data.text && data.text.length > 0) {
      onHandleLoading(true);
      onSaveFood(data.text, null, mealIndex);
    }
    //onSaveFood('5aaa1d21a2d64e7c62282a69', null, mealIndex);
  }

  function getTotals(data:any) {
    const obj:any = {
      cals: 0,
      tcals: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      tprotein: 0,
      tcarbs: 0,
      tfat: 0
    };
    data.forEach((item:any) => {
      obj.cals += item.cals;
      obj.protein += item.protein;
      obj.carbs += item.carbs;
      obj.fat += item.fat;
      obj.tcals += item.tcals;
      obj.tprotein += item.tprotein;
      obj.tcarbs += item.tcarbs;
      obj.tfat += item.tfat;
    });

    Object.entries(obj).forEach(([key, value]) => {
      obj[key] = formatNumber(obj[key]);
    });

    obj.pcals = getPercent(obj.cals, obj.tcals);
    obj.pprotein = getPercent(obj.protein, obj.tprotein);
    obj.pcarbs = getPercent(obj.carbs, obj.tcarbs);
    obj.pfat = getPercent(obj.fat, obj.tfat);

    obj.ccals = getItemClass(obj.pcals);
    obj.cprotein = getItemClass(obj.pprotein);
    obj.ccarbs = getItemClass(obj.pcarbs);
    obj.cfat = getItemClass(obj.pfat);
    if (obj.cals == 0) {
      obj.cals = '0';
    }
    setState((stateObj:any) => ({
      ...stateObj,
      totals: obj
    }));
  }

  function getCalculatedValues(item:any) {
    const foods = item.foods ? item.foods : [];
    let cals = 0, protein = 0, carbs = 0, fat = 0;
    let tcals = 0, tprotein = 0, tcarbs = 0, tfat = 0;
    // let ccals = 0, cprotein = 0, ccarbs = 0, cfat = 0;
    let isDisplayCheckmark = false; // if need to show tick make it to true
    if (foods.length === 0) {
      isDisplayCheckmark = false;
    }
    foods.forEach((fooditem:any)=> {
      if (!fooditem.item_qty) {
        fooditem.item_qty = fooditem.log_qty ? fooditem.log_qty : fooditem.qty;
      }
      const servQty = fooditem.qty ? fooditem.qty : fooditem.serving_qty;
      if (fooditem.toggle) {
        cals += (fooditem.item_qty/servQty) * fooditem.calories;
        protein += (fooditem.item_qty/servQty) * fooditem.protein;
        fat += (fooditem.item_qty/servQty) * fooditem.fat;
        carbs += (fooditem.item_qty/servQty) * fooditem.carbs;
      } else {
        isDisplayCheckmark = false;
        // tcals += (fooditem.item_qty/fooditem.qty) * fooditem.calories;
        // tprotein += (fooditem.item_qty/fooditem.qty) * fooditem.protein;
        // tfat += (fooditem.item_qty/fooditem.qty) * fooditem.fat;
        // tcarbs += (fooditem.item_qty/fooditem.qty) * fooditem.carbs;
      }
      if (!fooditem.is_able_to_delete) {
        tcals += fooditem.calories;
        tprotein += fooditem.protein;
        tcarbs += fooditem.carbs;
        tfat += fooditem.fat;
      }
    });

    item.tcals = tcals;
    item.tprotein = tprotein;
    item.tfat = tfat;
    item.tcarbs = tcarbs;

    item.cals= formatNumber(cals);
    item.protein= formatNumber(protein);
    item.fat= formatNumber(fat);
    item.carbs= formatNumber(carbs);
    item.foods = foods;
    item.isCheckmarkDisplay = isDisplayCheckmark;

    return item;
  }

  function setUserName(name:string) {
    setState((stateObj:any) => ({
      ...stateObj,
      userName: name
    }));
  }

  async function getNutritionData(selDate: any) {
    onHandleLoading(true);
    const url = `${Constants.baseUrl}${Method.getClientNutrition}`;
    const reqData = {
      logdate: selDate
    };

    const response = await postApi(url, reqData);
    if (isSuccess(response)) {
      let mealsList:any = [];
      response.data.programs.mealplans.forEach((item:any, mealIndex:number) => {
      const specdata = item;
      const program_id = specdata.program_id;
      const mealplanid = specdata.id;
      const { meals } = specdata;
      meals.forEach((item:any, i:any) => {

        if (i === 0) {
          meals[i].planName = specdata.name;
        }

        meals[i] = getCalculatedValues(item);
        meals[i].time = tConvert(item.time);
        meals[i].program_id = program_id;
        meals[i].id = mealplanid;
        meals[i].isDisplay = (i === 0 && mealIndex === 0) ? true : false;
        mealsList.push(meals[i]);
      });
    });
      setUserEmail(response.data.users.email);
      setState((stateObj:any) => ({
        ...stateObj,
        nutritionData: mealsList,
        userName: response.data.users.firstname
      }));
      getTotals(mealsList);
    } else {
      const { data = {}} = response;
      if (data?.response?.users) {
        setUserEmail(data.response.users.email);
        setState((stateObj:any) => ({
          ...stateObj,
          userName: data.response.users.firstname
        }));
      }
      if (data.message === 'No Active Programs found') {
        setState((stateObj:any) => ({
          ...stateObj,
          isNoActiveProgram: true,
          userName: data?.response?.users?.firstname || ''
        }));
      } else if (data.message) {
        onHandleToast(getInfoFormat(data.message, false));
      } else if (data.error) {
        onHandleToast(getInfoFormat(data.error, false));
      }else {
        onHandleToast(getInfoFormat("Error occurred, Please try again", false));
      }
    }
    onHandleLoading(false);
  }

  function onNutritionDate(value:any) {
    //console.log(value);
    // const { weekList } = state;
    const dt = value.split('T')[0];
    const now = new Date(value);
    const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const selectedWeekList = getWeeksList(utcDate);
    setState((stateObj:any) => ({
      ...stateObj,
      nutritionDate: dt,
      weekList: selectedWeekList
    }));
    //getNutritionData(dt);
  }

  function addFood(isDisplay: boolean, i: any = -1) {
    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayAddFood: isDisplay,
      mealIndex: i === -1 ? '' : i,
      foodData: {results: [], total: -1},
      searchFood: '',
      selectedFood: []
    }));
  }

  function addSubstitute(isDisplay: boolean) {
    setState((stateObj:any) => ({
      ...stateObj,
      isDisplaySubstitute: isDisplay
    }));
  }

  function addNotes(isDisplay: boolean, i:any = -1) {
    //debugger;
    const { nutritionData } = state;

    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayNotes: isDisplay,
      notesIndex: i,
      foodItemIndex: -1,
      notes: '',
      selectedwaternote: i !== -1 ? nutritionData[i].waternote : ''
    }));
  }

  function addClientNotes(isDisplay: boolean, i:any = -1, j:any = -1) {
    const { nutritionData } = state;

    if (!nutritionData[i].foods[j].lognutritionsinglefoods_id) {
      return false;
    }

    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayNotes: isDisplay,
      notesIndex: i,
      foodItemIndex: j,
      notes: '',
      selectedwaternote: (i !== -1 && j !== -1) ? nutritionData[i].foods[j].clientnote : ''
    }));
  }

  async function onDining(isDisplay:boolean) {
    onHandleLoading(true);
    if (isDisplay) {
      const url = `${Constants.baseUrl}${Method.getdiningoutguide}`;
      const response = await getApi(url);
      if(isSuccess(response)) {
        const result = response.data;
        const defaultObj = {
          'none': {
            "content": [],
            "contentName": 'None'
          }
        };
        result.cuisine = {...defaultObj, ...result.cuisine};
        setState((stateObj:any) => ({
          ...stateObj,
          isDisplayDining: isDisplay,
          diningInfo: response.data,
          searchRestaurants: [],
          searchedRestaurant: '',
          diningInfoSelected: {'cuisine': {content:[]}, 'restaurant': {content:[], contentName: ''}}
        }));
      } else {
        onHandleToast(getInfoFormat("Failed to load dining, Please try again", false));
      }
    } else {
      setState((stateObj:any) => ({
        ...stateObj,
        isDisplayDining: isDisplay
      }));
    }
    onHandleLoading(false);
  }

  function onChangeQty(mealindex:number, foodindex:number, isAdd:boolean) {
    const { nutritionData } = state;
    const specitemqty = nutritionData[mealindex].foods[foodindex].item_qty;
    const specqty = nutritionData[mealindex].foods[foodindex].qty;
    let resultqty = 0;
    if (isAdd) {
      resultqty = specitemqty + 1;
    } else {
      resultqty = specitemqty - 1;
    }
    if (resultqty <= 0) {
      resultqty = specqty;
    }
    const resultval:any = Number.isInteger(resultqty) ? resultqty : resultqty.toFixed(2);
    nutritionData[mealindex].foods[foodindex].item_qty = parseFloat(resultval);
    setState((stateObj:any) => ({
      ...stateObj,
      nutritionData: nutritionData
    }));
  }

  async function updateNutritionData(mealindex:number, foodindex:number, nutritionData:any) {
    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayProgressBar: true
    }));

    const { nutritionDate } = state;
    let url = `${Constants.baseUrl}${Method.createlognutritionsinglefood}`;

    let payload:any = { };
    if (nutritionData[mealindex].foods[foodindex].lognutritionsinglefoods_id) {
      url = `${Constants.baseUrl}${Method.updatelognutritionsinglefoods}`;
      const obj = {
        lognutritionsinglefoods_id: nutritionData[mealindex].foods[foodindex].lognutritionsinglefoods_id,
        data: {
          toggle: getToggleValue(nutritionData[mealindex].foods[foodindex].toggle),
          logdate: nutritionDate,
          log_qty: nutritionData[mealindex].foods[foodindex].item_qty,
          clientnote: nutritionData[mealindex].foods[foodindex].clientnote
        }
      };
      payload = [obj];
    } else {
      nutritionFoodItem = true;
      onHandleLoading(true);
      const obj = { 
        meal_id: nutritionData[mealindex].meal_id,
        toggle: getToggleValue(nutritionData[mealindex].foods[foodindex].toggle),
        logdate: nutritionDate,
        program_id: nutritionData[mealindex].program_id,
        mealplan_id: nutritionData[mealindex].id,
        mealfoods: [{
          id: nutritionData[mealindex].foods[foodindex].mealfood_id,
          log_qty: nutritionData[mealindex].foods[foodindex].item_qty
        }]
      };
      payload = obj;
    }
     const response = await postApi(url, payload);
     if (isSuccess(response)) {
      if (response.data) {
        if (nutritionData[mealindex].foods[foodindex].lognutritionsinglefoods_id) {
          const { lognutritionsinglefoods_id, data } = response.data[0].data;
          nutritionData[mealindex].foods[foodindex].lognutritionsinglefoods_id = lognutritionsinglefoods_id;
          nutritionData[mealindex].foods[foodindex].toggle = data.toggle;
        } else {
          const { lognutritionsinglefoods_id, toggle } = response.data[0].data;
          nutritionData[mealindex].foods[foodindex].lognutritionsinglefoods_id = lognutritionsinglefoods_id;
          nutritionData[mealindex].foods[foodindex].toggle = toggle;
        }
      }
      nutritionData[mealindex] = getCalculatedValues(nutritionData[mealindex]);
      setState((stateObj:any) => ({
        ...stateObj,
        nutritionData: nutritionData
      }));
      getTotals(nutritionData);
     } else {
      onHandleToast(getInfoFormat("Error occurred, Please try again", false));
     }
     setState((stateObj:any) => ({
      ...stateObj,
      isDisplayProgressBar: false,
      isDisplayNotes: false
    }));
     onHandleLoading(false);
     nutritionFoodItem = false;
  }

  async function onFoodToggle(mealindex:number, foodindex:number, ev:any) {
    const isChecked = ev.currentTarget.checked;
    const { nutritionData } = state;
    nutritionData[mealindex].foods[foodindex].toggle = isChecked;
    if (!nutritionFoodItem) {
      updateNutritionData(mealindex, foodindex, nutritionData);
    }
    handleKeyboardDisplay(false);
  }

  function onItemQty(mealindex:number, foodindex:number, ev:any) {
    const value = ev.currentTarget.value;
    const { nutritionData } = state;
    nutritionData[mealindex].foods[foodindex].item_qty = parseFloat(value);
    if (nutritionData[mealindex].foods[foodindex].log_qty) {
      nutritionData[mealindex].foods[foodindex].log_qty = parseFloat(value);
    }
    if (!nutritionFoodItem) {
      updateNutritionData(mealindex, foodindex, nutritionData);
    }
    // setState((stateObj:any) => ({
    //   ...stateObj,
    //   nutritionData: nutritionData
    // }));
  }

  function onItemQtyChange(mealindex:number, foodindex:number, ev:any) {
    const value = ev.currentTarget.value;
    const { nutritionData } = state;
      nutritionData[mealindex].foods[foodindex].log_qty = parseFloat(value);
      const foodValue = parseFloat(value);
    nutritionData[mealindex].foods[foodindex].item_qty = isNaN(foodValue) ? '' : foodValue;
    if (nutritionData[mealindex].foods[foodindex].log_qty) {
      nutritionData[mealindex].foods[foodindex].log_qty = parseFloat(value);
    }
      setState((stateObj:any) => ({
      ...stateObj,
      nutritionData
    }));
  }

  async function fetchSearchFood(value:string) {
    if (!value || value.length === 0) {
      return false;
    }
    setState((stateObj:any) => ({
      ...stateObj,
      isDisplaySelectedFoodLoader: true
    }));
    const url = `${Constants.baseUrl}${Method.nutritionSearch}${value}`;
    const response = await getApi(url);
    if (isSuccess(response)) {
      setState((stateObj:any) => ({
        ...stateObj,
        foodData: response.data,
        foodDataResponse: response.data,
        isDisplaySelectedFoodLoader: false
      }));
    } else {
      onHandleToast(getInfoFormat("Error occurred, Please try again", false));
    }
  }

  async function onSearchFood(value:any) {
    
    setState((stateObj:any) => ({
      ...stateObj,
      searchFood: value
    }));

    clearTimeout(foodTimeValue);
    foodTimeValue = setTimeout(()=>{
      fetchSearchFood(value);
    }, 1000);
  }

  function onNotesChange(text:string) {
    setState((stateObj:any) => ({
      ...stateObj,
      notes: text
    }));
  }

  async function onSaveNotes () {
    const { notes, notesIndex, nutritionDate, nutritionData, selectedwaternote = '', foodItemIndex } = state;
    const data = nutritionData[notesIndex];
    if (notes.length === 0) {
      onHandleToast(getInfoFormat('Notes should not be empty', false));
      return false;
    }

    onHandleLoading(true);
    if (foodItemIndex !== -1) {
      nutritionData[notesIndex].foods[foodItemIndex].clientnote = nutritionData[notesIndex].foods[foodItemIndex].clientnote ? nutritionData[notesIndex].foods[foodItemIndex].clientnote : '' + '\n' +notes;
      updateNutritionData(notesIndex, foodItemIndex, nutritionData);
      return false;
    }
    let obj:any = {};
    let url:string = '';
    let resultnote = notes;

    if (selectedwaternote?.length > 0) {
      resultnote += "\n" + selectedwaternote; 
    }
    // resultnote = resultnote.replace(\\g);
    if (data.lognutritionsingle_id) {
      obj = {
        "program_id": data.program_id,
        "lognutritionsingle_id": data.lognutritionsingle_id,
        "data": {
          logdate: nutritionDate,
       }
      }
      if (foodItemIndex !== -1) {
        obj.data.clientnote = resultnote;
      } else {
        obj.data.waternote = resultnote;
      }
      url = `${Constants.baseUrl}${Method.updatelognutritionsingles}`;
    } else {
      obj = {
        "logdate": nutritionDate,
        "program_id": data.program_id,
        "mealplan_id": data.mealplan_id,
        "meal_id":data.meal_id,   
        "waternote": resultnote
      };
      url = `${Constants.baseUrl}${Method.createlognutritionsingle}`;
    }
    const response = await postApi(url, obj);
    if (isSuccess(response)) {
      nutritionData[notesIndex].waternote = resultnote;
      if (response.data.data) {
        const { lognutritionsingle_id = '' } = response.data.data;
        nutritionData[notesIndex].lognutritionsingle_id = lognutritionsingle_id;
      }
      setState((stateObj:any) => ({
        ...stateObj,
        nutritionData: nutritionData,
        notes: '',
        selectedwaternote: resultnote
      }));
    } else {

    }
    onHandleLoading(false);
  }

  function handleDisplayData(i:number) {
    const { nutritionData } = state;
    nutritionData[i].isDisplay = !nutritionData[i].isDisplay;
    setState((stateObj:any) => ({
      ...stateObj,
      nutritionData: nutritionData
    }));
  }

  function onRestaurantSearch(value:string) {
    const { diningInfo } = state;
    if (!value) {
      return false;
    }
    const specval = value.toString();
    const result:any = [];
    Object.keys(diningInfo.restaurants).filter(key => {
      const content = diningInfo.restaurants[key].contentName.toLowerCase();
      if (content.indexOf(specval) !== -1) {
        result.push(diningInfo.restaurants[key]);
      }
    });
    setState((stateObj:any) => ({
      ...stateObj,
      searchRestaurants: result,
      searchedRestaurant: specval
    }));
  }

  function onSelectedRestaurant(data:any) {
    const { diningInfoSelected } = state;
    diningInfoSelected.restaurant = data;
    setState((stateObj:any) => ({
      ...stateObj,
      diningInfoSelected: diningInfoSelected
    }));
  }

  function onCuisineSelect(value:string) {
    const { diningInfo, diningInfoSelected } = state;
    const data = diningInfo.cuisine[value];
    diningInfoSelected.cuisine = data;
    setState((stateObj:any) => ({
      ...stateObj,
      diningInfoSelected: diningInfoSelected
    }));
  }

  function onViewGuide(isDisplay:boolean) {
    const { diningInfoSelected } = state;
    const { cuisine, restaurant } = diningInfoSelected;
    if (cuisine.content.length === 0 && restaurant.contentName.length === 0) {
      onHandleToast(getInfoFormat('Please select Cuisine or Restaurant', false));
    } else {
      setState((stateObj:any) => ({
        ...stateObj,
        isDisplayDiningInfo: isDisplay
      }));
    }
  }

  async function onSelectedFoodItem(item:any, index:number) {
    const { foodData } = state;
    item.selected = true;
    foodData.results[index] = item;
    setState((stateObj:any)=>({
      ...stateObj,
      isDisplaySelectedFoodLoader: true
    }));
    let response = [];
    if (item.nix_item_id) {
      const url = `${Constants.baseUrl}${Method.searchnutritionbyscan}${item.nix_item_id}`;
      response = await getApi(url);
    } else {
      const url = `${Constants.baseUrl}${Method.nutritionnutrients}`;
      const obj = {
        item: item.item_name
      }

      response = await postApi(url, obj);
    }

    if (isSuccess(response)) {
      const [foodItem] = response.data.foods;
      foodItem.log_qty = foodItem.serving_qty;

      foodItem.calccalories = roundValue(foodItem.calories);
      foodItem.calcprotein = roundValue(foodItem.protein);
      foodItem.calccarbs = roundValue(foodItem.carbs);
      foodItem.calcfat = roundValue(foodItem.fat);

      foodItem.toggle = 1;
      // foodItem.is_able_to_delete = true;
      foodItem.name = foodItem.food_name;
      foodItem.unit = foodItem.serving_unit;
      onSaveFood(null, foodItem);
    }

    setState((stateObj:any)=>({
      ...stateObj,
      isDisplaySelectedFoodLoader: false,
      foodData
    }));
  }

  async function onSaveFood(scannedid:any, selectedFood:any, selectedMealIndex = -1) {
    const { nutritionData, nutritionDate } = state;
    let { mealIndex } = state;
    if (selectedMealIndex !== -1) {
      mealIndex = selectedMealIndex;
    }
    onHandleLoading(true);
    let url = `${Constants.baseUrl}${Method.nutritionnutrients}`;
    // const obj = {
    //   item: selectedFood.item_name
    // }
    let response:any = '';
    if (scannedid) {
      url = `${Constants.baseUrl}${Method.searchnutritionbyscan}${scannedid}`;
      response = await getApi(url);
    } 
    // else {
    //   response = await postApi(url, obj);
    // }
    if (!scannedid || isSuccess(response)) {
      if (response && response.data && response.data.message) {
        // setState((stateObj:any)=>({
        //   ...stateObj,
        //   isSearchNotFound: true
        // }));
        onHandleToast(getInfoFormat(`No resource exists: ${scannedid}`, false));
        onHandleLoading(false);
        return false;
      }
      let foodItem:any = '';
      if (scannedid) {
        [foodItem] = response.data.foods;
        foodItem.name = foodItem.food_name;
        if (!foodItem.unit) {
          foodItem.unit = foodItem.serving_unit;
        }
        if (!foodItem.log_qty) {
          foodItem.log_qty = foodItem.serving_qty;
        }
        foodItem.toggle = 1;
      }

      const url = `${Constants.baseUrl}${Method.createlognutritionsinglefood}`;

      const obj = {
        isnutritionfood: true,
        meal_id: nutritionData[mealIndex].meal_id,
        // toggle: 1,
        logdate: nutritionDate,
        program_id: nutritionData[mealIndex].program_id,
        mealplan_id: nutritionData[mealIndex].id,
        foodItems: foodItem ? [foodItem] : [selectedFood]
        // log_qty: foodItem.serving_qty,
        //name: foodItem.food_name
      };
    //  const result = {...obj, ...foodItem};
    //  delete result.full_nutrients;
     const resultant:any = await postApi(url, obj);
     if (isSuccess(resultant)) {
      const { foodItems } = resultant.data.request;
      // if (foodItem) {
      //   foodItem.is_able_to_delete = true;
      // }
      if (foodItems.length > 0) {
        foodItems.forEach((item:any) => {
          item.is_able_to_delete = true;
        });
      }
      // infodata.is_able_to_delete = true;
      const { foods } = nutritionData[mealIndex];
      nutritionData[mealIndex].foods = foodItems.reverse().concat(foods);
      nutritionData[mealIndex] = getCalculatedValues(nutritionData[mealIndex]);
      setState((stateObj:any)=>({
        ...stateObj,
        nutritionData: nutritionData
      }));
      getTotals(nutritionData);
      if (scannedid) {
        addFood(false);
        onDisplaySelectedItems(false);
      }
     } else {
      onHandleToast(getInfoFormat("Error occurred, Please try again", false));
     }
    }
    onHandleLoading(false);
  }

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    const { nutritionDate } = state;
    getNutritionData(nutritionDate);
    setTimeout(()=>{
      event.detail.complete();
    }, 1000);
  }

  function getDisplayInfo(key:string) {
    return state[key];
  }

  function onDisplaySelectedItems(isDisplay:boolean) {
    setState((stateObj:any)=>({
      ...stateObj,
      isDisplaySelectedItems: isDisplay
    }));
  }

  function onFoodQtyChange(index:number, ev:any) {
    const { selectedFood } = state;
    const value = ev.target.value;
    const val = parseFloat(value);
    const data = selectedFood[index];

    const specqty = val / data.serving_qty;
    data.log_qty = val;

    data.calccalories = roundValue(data.calories * specqty);
    data.calcprotein = roundValue(data.protein * specqty);
    data.calccarbs = roundValue(data.carbs * specqty);
    data.calcfat = roundValue(data.fat * specqty);

    setState((stateObj:any)=>({
      ...stateObj,
      selectedFood: selectedFood
    }));

  }

  function onRemoveSelectedFood(i:number) {
    const { selectedFood } = state;
    selectedFood.splice(i, 1);

    setState((stateObj:any)=>({
      ...stateObj,
      selectedFood: selectedFood
    }));
  }

  async function onSubstitution(isDisplay:boolean) {
    let { substitutionList = [] } = state;

    if (substitutionList.length === 0) {
      onHandleLoading(true);
      const url = `${Constants.baseUrl}${Method.getSubstitutionGuide}`;
      const result = await getApi(url);

      if (isSuccess(result)) {
        substitutionList = result.data;
      } else {
        onHandleToast(getInfoFormat("Error occurred to retrieve Substitution, Please try again", false));
      }


      onHandleLoading(false);
    }

    setState((stateObj:any)=>({
      ...stateObj,
      isDisplaySubstitution: isDisplay,
      substitutionList,
      filteredSubstitutionList: substitutionList
    }));
  }

  function onSubstitutionChange(value: string) {
    const { substitutionList = [] } = state;
    const modifiedvalue = value.toString();
    const result = substitutionList.filter((item:any)=> item.iteName.toLowerCase().indexOf(modifiedvalue) !== -1);
    setState((stateObj:any)=>({
      ...stateObj,
      filteredSubstitutionList: result,
      searchedSubstitution: value
    }));
  }

  function onSelectedItemIndex(val:number) {
    const { foodDataResponse } = state;
    let data:any = [];
    if (val == 0) {
      data = foodDataResponse.results;
    } else if (val == 1) {
      data = foodDataResponse.resultsv2.common;
    } else if (val == 2) {
      data = foodDataResponse.resultsv2.branded;
    }
    setState((stateObj:any)=>({
      ...stateObj,
      foodData: { results: data },
      selectedItemIndex: val
    }));
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
    nutritionDate: state.nutritionDate,
    getNutritionData,
    diningout,
    onNutritionDate,
    addFood,
    addSubstitute,
    isDisplayAddFood: state.isDisplayAddFood,
    isDisplaySubstitute: state.isDisplaySubstitute,
    isDisplayNotes: state.isDisplayNotes,
    addNotes,
    onDining,
    isDisplayDining: state.isDisplayDining,
    nutritionData: state.nutritionData,
    onChangeQty,
    onFoodToggle,
    onItemQty,
    onSearchFood,
    searchFood: state.searchFood,
    foodData: state.foodData,
    onNotesChange,
    notes: state.notes,
    onSaveNotes,
    notesIndex: state.notesIndex,
    selectedwaternote: state.selectedwaternote,
    handleDisplayData,
    diningInfo: state.diningInfo,
    onRestaurantSearch,
    matchRestaurants: state.matchRestaurants,
    userName: state.userName,
    searchRestaurants: state.searchRestaurants,
    onSelectedRestaurant,
    onViewGuide,
    isDisplayDiningInfo: state.isDisplayDiningInfo,
    onCuisineSelect,
    diningInfoSelected: state.diningInfoSelected,
    onSelectedFoodItem,
    selectedFood: state.selectedFood,
    onSaveFood,
    mealIndex: state.mealIndex,
    onBarCodeAction,
    searchedRestaurant: state.searchedRestaurant,
    doRefresh,
    onDeleteRecord,
    getDisplayInfo,
    totals: state.totals,
    onDisplaySelectedItems,
    isDisplaySelectedItems: state.isDisplaySelectedItems,
    onFoodQtyChange,
    onRemoveSelectedFood,
    isDisplaySelectedFoodLoader: state.isDisplaySelectedFoodLoader,
    isDisplayProgressBar: state.isDisplayProgressBar,
    onItemQtyChange,
    onSubstitution,
    isDisplaySubstitution: state.isDisplaySubstitution,
    onSubstitutionChange,
    substitutionList: state.substitutionList,
    filteredSubstitutionList: state.filteredSubstitutionList,
    searchedSubstitution: state.searchedSubstitution,
    isNoActiveProgram: state.isNoActiveProgram,
    setUserName,
    selectedItemIndex: state.selectedItemIndex,
    onSelectedItemIndex,
    addClientNotes,
    weekList: state.weekList,
    initiateWeekList,
    toggleMenu
  };
};

export default NutritionHook;
