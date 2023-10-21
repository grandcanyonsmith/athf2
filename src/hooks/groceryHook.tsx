import { useContext } from 'react';
import { GroceryContext } from '../context/groceryContext';
import { getApi, postApi, deleteApi } from '../actions/http';
import Method from '../constants/methodConstants';
import Constants from '../constants/appConstants';
import { isSuccess, getInfoFormat } from '../actions/common';
import AppHook from './appHook';

const GroceryHook = () => {
  const [state, setState] = useContext(GroceryContext);
  const { onHandleLoading, onHandleToast } = AppHook();

  function handleGrocerySync(isDisplay:boolean) {
    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayGrocerysync: isDisplay
    }));
  }

  function handleRecipes(isDisplay:boolean) {
    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayRecipes: isDisplay
    }));
  }

  async function getgrocerylist() {
    onHandleLoading(true);
    const url = `${Constants.baseUrl}${Method.getgrocerylist}`;
    const response = await getApi(url);
    if (isSuccess(response)) {
      const { data } = response;
      const resultant:any = data.allFoods;
      //let recipesdata:any = [];
      // data.forEach((item:any) => {
      //   const obj = item.foods[0];
      //     const recipeids = item.recipes.map((rec:any) => (rec.id));
      //     Object.keys(obj).forEach((key:any) => {
      //       const recipeIndex = recipeids.indexOf(obj[key].recipe_id);
      //       if (recipeIndex !== -1) {
      //         obj[key].recipeData = {
      //           name: item.recipes[recipeIndex].name,
      //           instructions: item.recipes[recipeIndex].instructions,
      //           recipefoods: item.recipes[recipeIndex].recipefoods.map((rf:any)=>({'qty':rf.qty,'unit':rf.unit,'name':rf.name}))
      //         };
      //       }
      //       resultant.push(obj[key]);
      //     });
        //recipesdata = recipesdata.concat(item.recipes);
      //});

      setState((stateObj:any) => ({
        ...stateObj,
        groceryList: resultant,
        //recipes: recipesdata
      }));
    } else {
      const { data = {}} = response;
      if (data.message === 'No active program for the user') {
        setState((stateObj:any) => ({
          ...stateObj,
          isNoActiveProgram: true
        }));
      } else if (data.message) {
        onHandleToast(getInfoFormat(data.message, false));
      }
      else if (data.error) {
        onHandleToast(getInfoFormat(data.error, false));
      } else {
        onHandleToast(getInfoFormat("Error occurred, Please try again", false));
      }
    }
    onHandleLoading(false);
  }

  function onRecipeSelected(data:any) {
    setState((stateObj:any) => ({
      ...stateObj,
      recipes: [data]
    }));
  }

  async function onGrocerySelected (event:any, data:any, index:number) {
    const { checked } = event.target;
    const { groceryList } = state;
    onHandleLoading(true);
    if (checked) {
      const url = `${Constants.baseUrl}${Method.savegrocerylist}`;
      const result = await postApi(url, [data]);
      if (isSuccess(result)) {
        groceryList[index].id = result.data.data.id;
      } else {
        onHandleToast(getInfoFormat("Error occurred while saving item", false));
      }
    } else {
      const url = `${Constants.baseUrl}${Method.removefoodfromgrocerylist}${data.id}`;
      const result = await deleteApi(url);
      if (isSuccess(result)) {
        delete groceryList[index].id;
      } else {
        onHandleToast(getInfoFormat("Error occurred while saving item", false));
      }
      setState((stateObj:any) => ({
        ...stateObj,
        groceryList,
      }));
    }
    onHandleLoading(false);
  }

  async function onGroceryNotes(isDisplay:boolean) {
    if (isDisplay) {
    onHandleLoading(true);
    let selectedwaternote = '';
    const url = `${Constants.baseUrl}${Method.getgrocerynotes}`;
    const result = await getApi(url);
    if (isSuccess(result)) {
      selectedwaternote = result.data.map((item:any) => `${item.note}\n\r`);
    }

    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayNotes: isDisplay,
      selectedNote: selectedwaternote
    }));
    onHandleLoading(false);

  } else {
    setState((stateObj:any) => ({
      ...stateObj,
      isDisplayNotes: isDisplay,
      notes: ''
    }));
  }
  }

  function onNotesChange(text:string) {
    setState((stateObj:any) => ({
      ...stateObj,
      notes: text
    }));
  }

  async function onSaveNotes() {
    onHandleLoading(true);

    const { notes } = state;
    const reqData = {"note": notes};
    const url = `${Constants.baseUrl}${Method.creategrocerynote}`;
    const result = await postApi(url, reqData);
    if (isSuccess(result)) {
      onGroceryNotes(false);
    } else {
      onHandleToast(getInfoFormat("Error occurred while saving notes, Please try again", false));
    }
    onHandleLoading(false);

  }

  function onCart(props:any) {
    props.history.push('/page/cart');
  }

  return {
    isDisplayGrocerysync: state.isDisplayGrocerysync,
    handleGrocerySync,
    isDisplayRecipes: state.isDisplayRecipes,
    handleRecipes,
    getgrocerylist,
    groceryList: state.groceryList,
    recipes: state.recipes,
    onRecipeSelected,
    onGroceryNotes,
    isDisplayNotes: state.isDisplayNotes,
    onNotesChange,
    onSaveNotes,
    selectedNote: state.selectedNote,
    notes: state.notes,
    onCart,
    onGrocerySelected,
    isNoActiveProgram: state.isNoActiveProgram
  };
};

export default GroceryHook;
