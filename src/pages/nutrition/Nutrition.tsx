import React, { useEffect } from 'react';
import { IonButtons, IonContent, IonHeader, IonImg, IonIcon, IonFooter, IonRefresher, IonItemSliding, IonItemOption, IonItemOptions, IonRefresherContent, IonCard, IonText, IonToggle, IonLabel, IonPage, IonProgressBar, IonToolbar, IonGrid, IonRow, IonCol, IonDatetime, IonItem, IonMenuToggle, IonInput, IonCardContent, useIonViewDidEnter, IonCardHeader, IonCardTitle } from '@ionic/react';
import { calendar, personCircleOutline, fastFoodOutline, pencilOutline, pencilSharp, chevronDownCircleOutline, fastFoodSharp, addOutline, addSharp, removeOutline, removeSharp, createOutline, createSharp, checkmarkOutline, checkmarkSharp, pizzaOutline, personCircleSharp, barcodeOutline, barcodeSharp, pinOutline, pinSharp } from 'ionicons/icons';
import Chart from 'react-google-charts';
import { getTypePlatform, handleKeyboardDisplay, roundValue } from '../../actions/common';
import NutritionHook from '../../hooks/nutritionHook';
import AddFood from '../../components/addFood';
import Substitute from '../../components/substitute';
import AddNotes from '../../components/addNotes';
import Dining from '../../components/dining';
import DiningInfo from '../../components/dininginfo';
import SelectedFoods from '../../components/selectedFoods';
import FooterItems from '../../components/footerItems';
import Substitution from '../../components/substitution';
import { trackGAView } from '../../actions/common';
import AppHook from '../../hooks/appHook';
import './Nutrition.css';

import { Plugins, Capacitor } from "@capacitor/core";
import WeekCalendar from '../../components/weekCalendar';

const Nutrition:React.FC = (props:any) => {
    const name = 'Nutrition';
    const { isImpersonated, headerHeight } = AppHook();
    const { nutritionDate, diningout, getNutritionData, onNutritionDate, addFood, isDisplayAddFood, isDisplaySubstitute, addSubstitute,
        isDisplayNotes, addNotes, isDisplayDining, onDining, nutritionData, onChangeQty, onFoodToggle, onItemQty, onSearchFood, searchFood,
        foodData, onNotesChange, notes, onSaveNotes, selectedwaternote, handleDisplayData, diningInfo, onRestaurantSearch, userName, searchRestaurants,
        onSelectedRestaurant, onViewGuide, isDisplayDiningInfo, onCuisineSelect, diningInfoSelected, onSelectedFoodItem, selectedFood,
        onSaveFood, onBarCodeAction, searchedRestaurant, doRefresh, onDeleteRecord, getDisplayInfo, totals, onDisplaySelectedItems, isDisplaySelectedItems,
        onFoodQtyChange, onRemoveSelectedFood, isDisplaySelectedFoodLoader, isDisplayProgressBar, onItemQtyChange,
        onSubstitution, isDisplaySubstitution, isNoActiveProgram, onSubstitutionChange, filteredSubstitutionList, searchedSubstitution, selectedItemIndex, onSelectedItemIndex, addClientNotes,
        weekList, initiateWeekList, toggleMenu } = NutritionHook();
    useEffect(() => {
        getNutritionData(nutritionDate);
        trackGAView('Nutrition screen');
    }, [nutritionDate, isImpersonated]);

    useEffect(()=>{
        console.log(getDisplayInfo('isDisplayNotes'));
        initiateWeekList();
        if (Capacitor.isNative) {
            Plugins.App.addListener("backButton", (e:any) => {
                // console.log(window.location.pathname);
                // console.log(document.getElementsByTagName('ion-modal').length);
                // console.log(getDisplayInfo('isDisplayNotes'));
                // console.log(getDisplayInfo('isDisplayDining'));
                // console.log(getDisplayInfo('isDisplayAddFood'));
                if (window.location.pathname === '/tabs/nutrition') {
                    if (document.getElementsByTagName('ion-modal').length === 0) {
                        let ans = window.confirm("Are you sure");
                        // console.log('Selected alert value'+ans);
                        if (ans) {
                            Plugins.App.exitApp();
                        }
                    }
                }
                //e.preventDefault();
                return false;
            });
        }
    //     let handlePluginEvent;
    //     if (Capacitor.isNative) {
    //         handlePluginEvent = Plugins.App.addListener("backButton", (e) => {
    //             // if (window.location.pathname === '/tabs/nutrition') {
    //             //     if (!isDisplayNotes && !isDisplayDining && !isDisplayAddFood) {
    //             //         let ans = window.confirm("Are you sure");
    //             //         if (ans) {
    //             //             Plugins.App.exitApp();
    //             //         }
    //             //     }
    //             // }
    //             //if (isDisplayNotes) {
    //                 console.log(isDisplayNotes);

    //                 console.log(isDisplayDining);
    //                 console.log(isDisplayAddFood);
    //                 console.log(window.location.pathname);

    //             addNotes(false);
    //             addFood(false, -1);
    //             onDining(false);
    //         //   if (window.location.pathname === "/") {
    //         //     // Show A Confirm Box For User to exit app or not
    //         //     let ans = window.confirm("Are you sure");
    //         //     if (ans) {
    //         //       Plugins.App.exitApp();
    //         //     } 
    //         //   } else if (window.location.pathname === "/YourFirstPageRoute") {
    //         //      // Show A Confirm Box For User to exit app or not
    //         //     let ans = window.confirm("Are you sure");
    //         //     if (ans) {
    //         //       Plugins.App.exitApp();
    //         //     }
    //         //   } 
    //         // e.preventDefault();
    //         });
    //       }
    //       if (handlePluginEvent) {
    //         return handlePluginEvent.remove();
    //       }
    }, [])
    
    useIonViewDidEnter(() => {
        getNutritionData(nutritionDate);
    });

    const containerStyles = {
        height: 7,
        backgroundColor: "#e0e0de",
        borderRadius: 50
    }
    
    const pieData = [
        ['', ''],
        ['', totals.tprotein || 0],
        ['', totals.tfat || 0],
        ['', totals.tcarbs || 0]
      ]
      const pieOptions = {
        title: '',
        pieHole: 0.8,
        legend: {position: 'none'},
        colors: ['#95A3B3', '#6DB65B', '#4B4E6D'],
        tooltip: { trigger: 'none' },
        pieSliceText: 'none'
      }
      const pieDataNothing = [
        ['', ''],
        ['', 1]
      ]
      const pieOptionsNothing = {
        title: '',
        pieHole: 0.8,
        legend: {position: 'none'},
        colors: ['#e0e0de'],
        tooltip: { trigger: 'none' },
        pieSliceText: 'none'
      }
    return (
        <IonPage>
            <IonHeader style={{'height': headerHeight, background: '#ffffff'}}>
                <IonToolbar style={{'display': 'none'}}>
                    <img alt="THF Logo" className="thflogoimg" src="/assets/thflogo.png" />
                    <IonButtons slot="end" class="handle-menu-toggle-header">
                        <IonMenuToggle class="menu-toggle">
                            <IonIcon icon={personCircleOutline} />
                        </IonMenuToggle>
                    </IonButtons>
                </IonToolbar>
                <div className="progressDiv">
                    {isDisplayProgressBar &&
                    <IonProgressBar color="success" type="indeterminate"></IonProgressBar>
                    }
                </div>
            </IonHeader>
            <IonContent fullscreen class="nutrition-content">
            <IonRefresher slot="fixed" onIonRefresh={doRefresh} disabled={false}>
                <IonRefresherContent pullingIcon={chevronDownCircleOutline} ></IonRefresherContent>
            </IonRefresher>  
                <IonGrid>
                    <IonRow>
                        <IonCol class="fontSize noPaddingLeft">
                            <IonItem lines="none">
                                <IonText class="user-info">Hi, <span>{userName} </span></IonText>
                                <IonIcon ios={personCircleOutline} md={personCircleSharp} slot="end" onClick={()=>{ toggleMenu(); }} />
                            </IonItem>

                        </IonCol>
                        <IonCol>
                            <IonItem class="dateItem font-weight-500" lines="none">
                                <IonDatetime displayFormat="DDD MMM DD" class="datetime-ion" pickerFormat="MMM DD YYYY" placeholder="Select Date" color="success" value={nutritionDate} onIonChange={e => onNutritionDate(e.detail.value)}></IonDatetime>
                                <IonIcon class="ion-margin-start" icon={calendar} />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <WeekCalendar weekList={weekList} onDaySelection={onNutritionDate}/>
                    <IonItem lines="none">
                        <IonText class="fontBold">Nutrition</IonText>
                    </IonItem>
                    <IonCard class="graphical_card">
                        <IonRow>
                            <IonCol className={totals.ccals}>
                                <div className={`mt-4 calories_graph cals_adjust_info ${(totals.pcals === 0 || !(roundValue(totals.tcals) > 0) ) ? 'nograph' : 'graph'}`}>
                                <div className="cals_content">
                                            <strong>{totals.cals || 0} <br/> Cal</strong> <br/>
                                            <span>of {totals.tcals || 0}</span>
                                        </div>
                                    <div className="with_data_exists">
                                        <Chart
                                            width={'150px'}
                                            height={'150px'}
                                            chartType="PieChart"
                                            loader={<div>Loading Chart</div>}
                                            data={pieData}
                                            options={pieOptions}
                                            rootProps={{ 'data-testid': '3' }}
                                        />
                                    </div>
                                    <div className="no_data_exists">
                                    <Chart
                                            width={'150px'}
                                            height={'150px'}
                                            chartType="PieChart"
                                            loader={<div>Loading Chart</div>}
                                            data={pieDataNothing}
                                            options={pieOptionsNothing}
                                            rootProps={{ 'data-testid': '3' }}
                                        />
                                    </div>
                                </div>
                            <div className="linear_progress">
                            <div className="mt-5">
                                <div className="font-12 mb-5 warning-contrast">
                                    <span>Carbs</span>
                                    {
                                        roundValue(totals.tcarbs) > 0 &&
                                        <span className='float_right'>{totals.carbs}/{roundValue(totals.tcarbs)} g</span>
                                    }
                                </div>
                                <div style={containerStyles} className="progress-container-info">
                                    <div style={{width: `${totals.pcarbs}%`}} className={`progress-filler-styles carbs ${totals.ccarbs}`}>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="font-12 mb-5 warning-contrast">
                                    <span>Protein</span>
                                    {
                                        roundValue(totals.tprotein) > 0 &&
                                        <span className='float_right'>{totals.protein}/{roundValue(totals.tprotein)} g</span>
                                    }
                                </div>
                                <div style={containerStyles} className="progress-container-info">
                                    <div style={{width: `${totals.pprotein}%`}} className={`progress-filler-styles protein ${totals.cprotein}`}>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="font-12 mb-5 warning-contrast">
                                    <span>Fat</span>
                                    {
                                        roundValue(totals.tfat) > 0 &&
                                        <span className='float_right'>{totals.fat}/{roundValue(totals.tfat)} g</span>
                                    }
                                </div>
                                <div style={containerStyles} className="progress-container-info">
                                    <div style={{width: `${totals.pfat}%`}} className={`progress-filler-styles fat ${totals.cfat}`}>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                    <IonRow>
                        <IonCol>
                        <IonItem lines="none" class="link-color" 
                                onClick={() => {
                                    onSubstitution(true);
                                }}
                        >
                                <IonText class="spec-padding dining-out font-weight-500">Substitution</IonText>
                                {/* <IonIcon class="substitution-icon" ios={pizzaOutline} md={pizzaOutline} /> */}
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem lines="none" class="floatRight link-color" 
                                onClick={() => {
                                    if (isDisplayDining) {
                                        onDining(false)
                                        setTimeout(()=> {
                                            onDining(true)
                                        }, 0);
                                    } else {
                                        onDining(true)
                                    }
                            }}>
                                <IonText class="spec-padding dining-out font-weight-500">Dining Out</IonText>
                                {/* <IonIcon slot="end" ios={fastFoodOutline} md={fastFoodSharp} /> */}
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {/* <IonRow class='nutrition-progress'>
                    <IonCol className={totals.ccals}>
                        <div className='info'>Calories</div>
                            <CircularProgressbar value={totals.pcals} text={totals.cals} />
                            <div className='info'>{roundValue(totals.tcals)}</div>
                    </IonCol>
                    <IonCol className={totals.cprotein}>
                        <div className='info'>Protein</div>
                            <CircularProgressbar value={totals.pprotein} text={totals.protein} />
                        <div className='info'>{roundValue(totals.tprotein)}</div>
                    </IonCol>
                    <IonCol className={totals.ccarbs}>
                        <div className='info'>Carbs</div>
                            <CircularProgressbar value={totals.pcarbs} text={totals.carbs} />
                            <div className='info'>{roundValue(totals.tcarbs)}</div>
                    </IonCol>
                    <IonCol className={totals.cfat}>
                        <div className='info'>Fat</div>
                            <CircularProgressbar value={totals.pfat} text={totals.fat} />
                            <div className='info'>{roundValue(totals.tfat)}</div>
                    </IonCol>
                </IonRow> */}
                {
                    isNoActiveProgram && 
                    <IonCard>
                        <IonCardContent>
                            No Active Programs found
                        </IonCardContent>
                    </IonCard>
                }
                {
                    nutritionData.map((item: any, i: any) => (
        
                        <div key={`n_${i}`} className={`${item.isCheckmarkDisplay ? 'highlight-spec-card' : ''}`}>
                        {
                            item.planName &&
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>{item.planName}</IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                        }
                        <IonCard class="card-main">
                            <IonItem lines="none" onClick={() => { handleDisplayData(i) }}>
                                {/* {
                                    item.isCheckmarkDisplay ?
                                    <IonIcon ios={checkmarkOutline} md={checkmarkSharp} color="success" slot="start" />:
                                    <IonIcon ios={pinOutline} md={pinSharp} color="success" slot="start" />
                                } */}
                                <IonLabel className="ion-text-wrap">
                                    <IonText slot="end" class="floatRight">{item.time}</IonText>
                                    <IonText>
                                        <p>{item.name}</p>
                                    </IonText>
                                </IonLabel>
                            </IonItem>
                            {
                                item.isDisplay &&
                                <>
                                    <IonRow class="main-info-item">
                                        <IonCol>
                                            <p>Calories</p>
                                            <p>{item.cals}</p>
                                        </IonCol>
                                        <IonCol>
                                            <p>Protein</p>
                                            <p>{item.protein}</p>
                                        </IonCol>
                                        <IonCol>
                                            <p> Carbs</p>
                                            <p>{item.carbs}</p>
                                        </IonCol>
                                        <IonCol>
                                            <p> Fat</p>
                                            <p>{item.fat}</p>
                                        </IonCol>
                                    </IonRow>
                                    {
                                        item.foods.map((fooditem: any, j: any) => (
                                            
                                            <span key={`nf_${j}`}>
                                                <IonRow>
                                                    <IonCol size="3"></IonCol>
                                                    <IonCol class="handle-padding">
                                                        <p className="handle-margin">{fooditem.name}</p>
                                                    </IonCol>
                                                </IonRow>
                                                <IonItemSliding disabled={!fooditem.is_able_to_delete}>
                                            <IonItem lines="none">
                                                <IonRow>
                                                    <IonCol size="3">
                                                        <IonToggle color="success" class="nutrition-toggle" checked={fooditem.toggle} onClick={e => onFoodToggle(i, j, e)}></IonToggle>
                                                    </IonCol>
                                                    <IonCol size="5">
                                                        <IonItem class="speccountinput ion-no-padding" lines="none"  >
                                                            <IonInput value={fooditem.item_qty} onBlur={e => onItemQty(i, j, e)}
                                                                onKeyDown={e => {
                                                                    if (e.keyCode === 13) {
                                                                        handleKeyboardDisplay(false);
                                                                        onItemQty(i, j, e)
                                                                    }
                                                                }} 
                                                                onIonChange={(e:any) => {
                                                                    if (isNaN(e.detail.value)) return;
                                                                    onItemQtyChange(i, j, e)
                                                                  }}
                                                                inputmode="decimal" type="number" class="inut_qty chg_qty_input nutrition_chg_qty" />
                                                        </IonItem>
                                                    </IonCol>
                                                    <IonCol class="unit-info">
                                                        <IonText>
                                                            {`${fooditem.qty ? fooditem.qty : fooditem.serving_qty} ${fooditem.unit}`}
                                                        </IonText>
                                                    </IonCol>
                                                    <IonCol size="1">
                                                        <IonIcon ios={fooditem.clientnote ? createOutline : pencilOutline} md={fooditem.clientnote ? createSharp : pencilSharp}  class="note_icon_food"
                                                            aria-disabled={!item.lognutritionsinglefoods_id}
                                                            className={fooditem.lognutritionsinglefoods_id ? '' : 'disable-icon'}
                                                            onClick={() => { 
                                                                if (isDisplayNotes) {
                                                                    addClientNotes(false);
                                                                    setTimeout(()=>{
                                                                        addClientNotes(true, i, j);
                                                                    }, 0);
                                                                } else {
                                                                    addClientNotes(true, i, j);
                                                                }
                    
                                                            }}
                                                        />
                                                    </IonCol>
                                                </IonRow>
                                                </IonItem>
                                            <IonItemOptions side="end">
                                            <IonItemOption color="danger" expandable onClick={()=>{onDeleteRecord(i,j)}}>
                                              Delete
                                            </IonItemOption>
                                          </IonItemOptions>
                                        </IonItemSliding>
                                            </span>
                                        ))
                                    }
                                    <IonRow class="footer-action-items">
                                        <IonCol>
                                            <IonText onClick={() => {
                                                if (isDisplayAddFood && !getTypePlatform()) {
                                                    addFood(false);
                                                    setTimeout(()=>{
                                                        addFood(true, i)
                                                    }, 0);
                                                } else {
                                                    addFood(true, i)
                                                }
                                            }} class="padding-cls font-weight-500 pallette-blue">
                                                Add Food
                            </IonText>
                                        </IonCol>
                                        <IonCol>
                                            <IonText class="padding-cls substitute_disable">
                                                
                            </IonText>
                                        </IonCol>
                                        <IonCol onClick={() => { 
                                            onBarCodeAction(i)
                                        }} class="spec-item-icon pallette-blue">
                                            <IonIcon ios={barcodeOutline} md={barcodeSharp} />
                                        </IonCol>
                                    </IonRow>
                                </>
                            }
                        </IonCard>
                        </div>
                    )
                    )}
                <AddFood showModal={isDisplayAddFood} isDisplaySelectedFoodLoader={isDisplaySelectedFoodLoader} onBarCodeAction={onBarCodeAction} onDisplaySelectedItems={onDisplaySelectedItems} addFood={addFood} onSearchFood={onSearchFood} onSelectedFoodItem={onSelectedFoodItem} searchFood={searchFood} foodData={foodData} selectedFood={selectedFood} isDisplaySelectedItems={isDisplaySelectedItems} selectedItemIndex={selectedItemIndex} onSelectedItemIndex={onSelectedItemIndex}/>
                <SelectedFoods showModal={isDisplaySelectedItems} onDisplaySelectedItems={onDisplaySelectedItems} selectedFood={selectedFood} onSaveFood={onSaveFood}  onFoodQtyChange={onFoodQtyChange} onRemoveSelectedFood={onRemoveSelectedFood} />
                <Substitute showModal={isDisplaySubstitute} addSubstitute={addSubstitute} />
                <AddNotes showModal={isDisplayNotes} addNotes={addNotes} selectedDate={nutritionDate} onNotesChange={onNotesChange} notes={notes}
                    onSaveNotes={onSaveNotes} selectedwaternote={selectedwaternote}
                />
                <Substitution  showModal={isDisplaySubstitution} onSubstitution={onSubstitution} onSubstitutionChange={onSubstitutionChange} searchedSubstitution={searchedSubstitution} filteredSubstitutionList={filteredSubstitutionList}/>
                <Dining showModal={isDisplayDining} onDining={onDining} diningInfo={diningInfo} onRestaurantSearch={onRestaurantSearch} searchRestaurants={searchRestaurants}
                    onSelectedRestaurant={onSelectedRestaurant} onViewGuide={onViewGuide} onCuisineSelect={onCuisineSelect} searchedRestaurant={searchedRestaurant} diningInfoSelected={diningInfoSelected} isDisplayDiningInfo={isDisplayDiningInfo} />
                <DiningInfo showModal={isDisplayDiningInfo} onDiningInfo={onViewGuide} diningInfoSelected={diningInfoSelected} />
            </IonContent>
            <FooterItems specific="nutrition" history={props.history} />
        </IonPage>
    );
};

export default Nutrition;
