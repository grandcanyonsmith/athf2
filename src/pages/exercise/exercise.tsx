import { IonButtons, IonContent, IonText, IonInput, IonHeader, IonItemOptions, IonItemOption, IonCard, IonIcon, IonProgressBar, IonPage, IonItemSliding, IonToolbar, IonGrid, IonRow, IonCol, IonDatetime, IonItem, IonMenuToggle, IonCardContent,
  IonRefresher, IonRefresherContent,  } from '@ionic/react';
import { personCircleOutline, calendar, checkmarkOutline, chevronDownCircleOutline, checkmarkSharp, playCircleSharp, playCircleOutline, pencilOutline, pencilSharp, addOutline, addSharp, createOutline, createSharp, trashSharp, trashOutline, personCircleSharp } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import AppHook from '../../hooks/appHook';
import ExerciseHook from '../../hooks/exerciseHook';
import Inputcontainer from '../../components/inputContainer/inputContainer';
import AddNotes from '../../components/addNotes';
import ExerciseInfo from '../../components/exerciseInfo';
import AddExercise from '../../components/addExercise';
import { getProgressExercise, handleKeyboardDisplay } from '../../actions/common';
import FooterItems from '../../components/footerItems';
import { trackGAView } from '../../actions/common';

import { Plugins, Capacitor } from "@capacitor/core";
import WeekCalendar from '../../components/weekCalendar';

const Exercise:React.FC = React.memo((props:any) => {
  const name = 'Exercise';
  const { isImpersonated } = AppHook();
  const { exerciseDate, onExerciseDate, onItemQty, onChangeQty, isDisplayNotes, addNotes, onNotesChange, notes,
    onSaveNotes, selectednote, isDisplayExerciseInfo, onExerciseInfo, onAddSet,
    isDisplayAddExercise, addExercise, onSearchExercise, searchExercise, exerciseData, onSelectExerciseItem, selectedExercise, getExerciseData,
    epedata, onAddExerciseNew, onDeleteSet, completed, onExerciseSpecSelect, doRefresh, onExerciseDelete, videoData, isNoRecordsExercise,
    isDisplayExerciseLoader, isDisplayProgressBar, onItemQtyChange, isNoActiveProgram, weekList, initiateWeekList, toggleMenu } = ExerciseHook();
  const percentage = 66;
  useEffect(() => {
    getExerciseData(exerciseDate, true);
    trackGAView('Exercise screen');
  }, [exerciseDate, isImpersonated]);

  useEffect(() => {
    initiateWeekList();
  }, [])

  return (
    <IonPage>
      <IonHeader style={{'height': '30px', background: '#ffffff'}}>
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

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh} disabled={false}>
            <IonRefresherContent pullingIcon={chevronDownCircleOutline} ></IonRefresherContent>
        </IonRefresher>
        
        <IonGrid>
          <IonRow>
            <IonCol class="fontSize">
              <IonItem lines="none">
                <IonText class="fontBold">Exercises</IonText>
                <IonIcon ios={personCircleOutline} md={personCircleSharp} slot="end" onClick={()=>{ toggleMenu(); }} />
              </IonItem>

            </IonCol>
            <IonCol>
              <IonItem class="dateItem font-weight-500" lines="none">
                <IonDatetime displayFormat="DDD MMM DD" class="datetime-ion" pickerFormat="MMM DD YYYY" placeholder="Select Date" color="success" value={exerciseDate} onIonChange={e => onExerciseDate(e.detail.value)}></IonDatetime>
                <IonIcon class="ion-margin-start" icon={calendar} />
              </IonItem>
            </IonCol>
          </IonRow>
        <WeekCalendar weekList={weekList} onDaySelection={onExerciseDate}/>
        </IonGrid>
        {
          !isNoActiveProgram && 
          <div onClick={() => {
            if (isDisplayAddExercise) {
              addExercise(false);
              setTimeout(()=>{
                addExercise(true);
              },0);
            } else {
              addExercise(true);
            }
            }} className="ion-text-end alignaddexercise font-weight-500 link-color" >
            Add Exercise
          </div>
        }
        
        <IonCard class="card-main">
          <IonCardContent>
            <p className="alignCenter"><strong>Your Progress</strong></p>
            <IonRow>
              <IonCol>
              <CircularProgressbar strokeWidth={15} value={getProgressExercise(completed, epedata.length)} text={`${getProgressExercise(completed, epedata.length)}%`} />
              </IonCol>
              <IonCol>
                <p className="alignCenter marginTop">
                  <strong>Way To Go!</strong>
                </p>
                <p className="alignCenter">
                  You completed {completed} out of {epedata.length}
                </p>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
        {
                    isNoActiveProgram && 
                    <IonCard>
                        <IonCardContent>
                            No Active Programs / Sessions found
                        </IonCardContent>
                    </IonCard>
                }
        {
          epedata.map((item: any, i: any) => (
            <IonCard key={`f_${i}`} class={`exe_card card-main ${item.isCheckmarkDisplay ? 'highlight-spec-card' : ''} hydrated`}>
                <IonItem lines="none">
                  <span onClick={()=>{ onExerciseSpecSelect(i)}} className="exe_check_mark_icon">
                  {
                    item.isCheckmarkDisplay ?
                    <IonIcon ios={checkmarkOutline} md={checkmarkSharp} color="success" slot="start" />:
                    <IonIcon name="pin" color="success" slot="start" />
                  }
                  </span>
                  <IonText onClick={()=>{ onExerciseSpecSelect(i)}} class="txt_ion_exe">
                    {item.name}
                    <p className='exe_plan_name'>{item.plan_name}</p>
                  </IonText>

                  {
                    item.video_url &&
                    <IonIcon slot="end" md={playCircleSharp} ios={playCircleOutline} onClick={()=>{
                      if (isDisplayExerciseInfo) {
                        onExerciseInfo(false);
                        setTimeout(()=>{
                          onExerciseInfo(true, i);
                        },0);
                      } else {
                        onExerciseInfo(true, i);
                      }
                    }} />
                  }
                  {
                    item.clientadded ?
                    <IonIcon slot="end" md={trashSharp} ios={trashOutline} class="del_exe_icon" onClick={()=>{onExerciseDelete(i)}} />
                    : ""
                  }
                </IonItem>
                {
                  item.isSetDetails && item.isDisplay &&
                  <>
                    <IonRow class="alignCenter">
                      <IonCol>
                        <p>Reps</p>
                        <p>{item.reps}</p>
                      </IonCol>
                      <IonCol>
                        <p>Rest</p>
                        <p>{item.rest}</p>
                      </IonCol>
                      <IonCol>
                        <p>Speed</p>
                        <p>{item.speed}</p>
                      </IonCol>
                      <IonCol>
                        <p>Sets</p>
                        <p>{item.sets}</p>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol class="handle-padding" >
                        <p className="exe_first_label">Weight lbs</p>
                      </IonCol>
                      <IonCol class="handle-padding">
                        <p className="exe_second_label">Reps</p>
                      </IonCol>
                    </IonRow>
                    {item.setdetails.map((sd: any, j: any) => (
                      <IonItemSliding key={`fs_${j}`} disabled={sd.clientadded ? false : true}>
                        <IonItem lines="none">
                          <IonRow>
                          <IonCol class="exe_unit_input">
                              <IonInput class="spec_exe_info_input" inputmode="decimal" type="number" value={sd.log_weight} 
                              onBlur={(e: any) => onItemQty(e, i, j, 'log_weight')}
                              placeholder={sd.default_log_weight}
                              onKeyDown={e=> {
                                if (e.keyCode === 13) {
                                  handleKeyboardDisplay(false);
                                  onItemQty(e, i, j, 'log_weight');
                              }
                              }}
                              onIonChange={(e:any) => {
                                if (isNaN(e.detail.value)) return;
                                onItemQtyChange(e, i, j, 'log_weight');
                              }}
                              />
                            </IonCol>
                            <IonCol class="spec_col_exe">
                              <IonItem class="speccountinput_exe ion-no-padding" lines="none"  >
                                <IonInput value={sd.log_reps} inputmode="decimal" type="number" 
                                placeholder={sd.default_log_reps}
                                onBlur={e => onItemQty(e, i, j, 'log_reps')} 
                                onKeyDown={e=> {
                                  if (e.keyCode === 13) {
                                    handleKeyboardDisplay(false);
                                    onItemQty(e, i, j, 'log_reps');
                                }
                                }}
                                onIonChange={(e:any) => {
                                  if (isNaN(e.detail.value)) return;
                                  onItemQtyChange(e, i, j, 'log_reps');
                                }}
                                class="inut_qty chg_qty_input exercise_chg_qty" />
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonItem>
                        <IonItemOptions side="end">
                          <IonItemOption color="danger" expandable onClick={()=>{onDeleteSet(i, j)}}>
                            Delete
                          </IonItemOption>
                        </IonItemOptions>
                      </IonItemSliding>
                    ))}
                  </>}
                {!item.isSetDetails && item.isDisplay && <>
                  <IonRow>
                    <IonCol class="handle-padding">
                      <p className="exe_first_label">Heart rate</p>
                    </IonCol>
                    <IonCol class="handle-padding" >
                      <p className="exe_second_label">Time</p>
                    </IonCol>
                  </IonRow>
                    <IonItem lines="none">
                  <IonRow>
                    <IonCol class="spec_col_exe">
                      <IonItem class="speccountinput_exe ion-no-padding" lines="none"  >
                        <IonInput value={item.log_heartrate} inputmode="decimal" type="number" 
                        onBlur={e => onItemQty(e, i, -1, 'log_heartrate')} 
                        onKeyDown={e=> {
                          if (e.keyCode === 13) {
                            handleKeyboardDisplay(false);
                            onItemQty(e, i, -1, 'log_heartrate');
                        }
                        }}
                        onIonChange={(e:any) => {
                          if (isNaN(e.detail.value)) return;
                          onItemQtyChange(e, i, -1, 'log_heartrate');
                        }}
                        class="inut_qty chg_qty_input exercise_chg_qty" />
                      </IonItem>
                    </IonCol>
                    <IonCol class="exe_unit_input">
                      <IonInput class="spec_exe_info_input" inputmode="decimal" type="number" value={item.log_duration} 
                      onBlur={(e: any) => onItemQty(e, i, -1, 'log_duration')}
                      onKeyDown={e=> {
                        if (e.keyCode === 13) {
                          handleKeyboardDisplay(false);
                          onItemQty(e, i, -1, 'log_duration');
                      }
                      }}
                      onIonChange={(e:any) => {
                        if (isNaN(e.detail.value)) return;
                        onItemQtyChange(e, i, -1, 'log_duration');
                      }}
                      />
                    </IonCol>
                  </IonRow>
                  </IonItem>
                </>
                }

                {
                item.isDisplay &&
                <>
                <IonItem lines="none">
                  <p>
                    {item.description}
                  </p>
                </IonItem>
                
                  <IonRow>
                    {item.isSetDetails && <IonCol onClick={() => { onAddSet(i) }}>
                      <IonText class="set_add font-weight-500 pallette-blue">
                        Add Set
                      </IonText>
                    </IonCol>}
                    <IonCol>

                    </IonCol>
                    <IonCol onClick={() => {
                      if (isDisplayNotes) {
                        addNotes(false);
                        setTimeout(()=>{
                          addNotes(true, i);
                        },0);
                      } else {
                        addNotes(true, i);
                      }
                    }} class="alignRight note_edit">
                      {
                        item.logexercisesingle_id &&
                        <IonIcon class="edit-note" ios={item.clientnote ? createOutline : pencilOutline} md={item.clientnote ? createSharp : createOutline} />
                      }
                    </IonCol>
                  </IonRow>
                  </>
                }
            </IonCard>
          ))
        }

        <AddNotes showModal={isDisplayNotes} addNotes={addNotes} selectedDate={exerciseDate} onNotesChange={onNotesChange} notes={notes}
          onSaveNotes={onSaveNotes} selectedwaternote={selectednote}
        />
        <ExerciseInfo showModal={isDisplayExerciseInfo} onExerciseInfo={onExerciseInfo} videoData={videoData} />
        <AddExercise isDisplayExerciseLoader={isDisplayExerciseLoader} isNoRecordsExercise={isNoRecordsExercise} onAddExerciseNew={onAddExerciseNew} showModal={isDisplayAddExercise} addExercise={addExercise} onSearchExercise={onSearchExercise} searchExercise={searchExercise} exerciseData={exerciseData} onSelectExerciseItem={onSelectExerciseItem} selectedExercise={selectedExercise} />
      </IonContent>
      <FooterItems specific="exercise" history={props.history} />
    </IonPage>
  );
});

export default Exercise;
