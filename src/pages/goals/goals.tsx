import {
  IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonCard, IonToolbar, IonGrid, IonRow, IonCol, IonDatetime, IonItem, IonMenuToggle,
  IonText, IonProgressBar, IonCardContent
} from '@ionic/react';
import { personCircleOutline, chevronForwardOutline, chevronForwardSharp, personCircleSharp } from 'ionicons/icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import React, { useEffect } from 'react';
import AppHook from '../../hooks/appHook';
import GoalsHook from '../../hooks/goalsHook';
import { Chart, Line } from 'react-charts';
import FooterItems from '../../components/footerItems';
import { trackGAView } from '../../actions/common';


const Goals:React.FC = (props:any) => {
  const name = 'Goals';
  const { isImpersonated, toggleMenu } = AppHook();
  const { getGoalsData, goalsData, onToggleGraph, isNoActiveProgram } = GoalsHook();

  useEffect(() => {
    getGoalsData();
    trackGAView('Goals screen');
  }, []);
  
  useEffect(() => {
    getGoalsData();
    trackGAView('Goals screen');
  }, [isImpersonated]);

  // const data = [{"label":"Series 1","data":[{"primary": new Date("2021-01-21"),"secondary":2},{"primary":new Date("2021-01-22"),"secondary":77},{"primary":new Date("2021-01-23"),"secondary":44},{"primary":new Date("2021-01-24"),"secondary":66},{"primary":new Date("2021-01-25"),"secondary":78},{"primary":new Date("2021-01-26"),"secondary":53},{"primary":new Date("2021-01-27"),"secondary":66},{"primary":new Date("2021-01-28"),"secondary":8}]}]

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "ordinal",
        position: "bottom"
      },
      { type: "linear", position: "left" },
    ],
    []
  );

    // const completed = 64;
  
  const containerStyles = {
    height: 20,
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: '0px 20px 20px 20px'
  }

  const fillerStyles = {
    height: '100%',
    width: `${goalsData.completed}%`,
    backgroundColor: '#99bc46',
    borderRadius: 'inherit',
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    lineHeight: '22px'
  }


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
      </IonHeader>

      <IonContent fullscreen>
      <IonGrid>
          <IonRow>
            <IonCol class="fontSize">
              <IonItem lines="none">
                <IonText class="fontBold">{name}</IonText>
                <IonIcon ios={personCircleOutline} md={personCircleSharp} slot="end" onClick={()=>{ toggleMenu(); }} />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      <div style={containerStyles} className="progress-container-info">
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${goalsData.completed}%`}</span>
      </div>
    </div>
        {/* <IonRow class="spec_progress_val">
          <IonProgressBar color='success' value={0.5}></IonProgressBar>
        </IonRow> */}
        {
                    isNoActiveProgram && 
                    <IonCard>
                        <IonCardContent>
                            No Active Programs found
                        </IonCardContent>
                    </IonCard>
                }
        <IonCard class="card-main spec-margin-handle">
          <IonItem>
            <IonGrid>
              <IonRow onClick={()=>{onToggleGraph('weight_toggle')}}>
                <IonCol class="goals-info" size="8">
                  <p>
                    <strong>Weight</strong>
                  </p>
                  <p>
                    <span className="item_goal"><strong>Starting</strong></span> {goalsData.goalweight_start} lbs
                  </p>
                  <p>
                    <span className="item_goal"><strong>Goal</strong></span> {goalsData.goalweight} lbs
                  </p>
                  <p>
                    <span className="item_goal"><strong>Current</strong></span> {goalsData.goalweight_latest} lbs
                  </p>
                </IonCol>
                <IonCol>
                  <p className="handle-font">
                    <strong>% of Goal to date</strong>

                  </p>
                  <CircularProgressbar value={goalsData.goalweight_percent} text={`${goalsData.goalweight_percent}%`} />
                </IonCol>
                <IonCol size="1">
                  <IonIcon class="icon-handle" md={chevronForwardSharp} ios={chevronForwardOutline} />
                </IonCol>
              </IonRow>
              {
                goalsData.weight_toggle &&
                <IonRow>
                <IonCol>
                  <div
                    style={{
                      height: '300px'
                    }}
                  >
                    {
                      goalsData.weight_graph.length > 0 &&
                      <Chart data={goalsData.weight_graph} axes={axes} />
                    }
                    {/* <Line data={data} options={options} /> */}
                  </div>
                </IonCol>
              </IonRow>
              }
              
            </IonGrid>
            {/* <IonIcon slot="end" md={chevronForwardSharp} ios={chevronForwardOutline} /> */}
          </IonItem>
        </IonCard>
        <IonCard class="card-main">
          <IonItem>
            <IonGrid>
              <IonRow onClick={()=>{onToggleGraph('bodyfat_toggle')}}>
                <IonCol class="goals-info" size="8">
                  <p>
                    <strong>Body Fat</strong>
                  </p>
                  <p>
                    <span className="item_goal"><strong>Starting</strong> </span> {goalsData.goalbodyfat_start} lbs
                  </p>
                  <p>
                    <span className="item_goal"><strong>Goal</strong> </span> {goalsData.goalbodyfat} lbs
                  </p>
                  <p>
                    <span className="item_goal"><strong>Current</strong></span>  {goalsData.goalbodyfat_latest} lbs
                  </p>
                </IonCol>
                <IonCol>
                  <p className="handle-font">
                    <strong>% of Goal to date</strong>

                  </p>
                  <CircularProgressbar value={goalsData.goalbodyfat_percent} text={`${goalsData.goalbodyfat_percent}%`} />
                </IonCol>
                <IonCol size="1">
                  <IonIcon class="icon-handle" md={chevronForwardSharp} ios={chevronForwardOutline} />
                </IonCol>
              </IonRow>
              {
                goalsData.bodyfat_toggle &&
                <IonRow>
                <IonCol>
                  <div
                    style={{
                      height: '300px'
                    }}
                  >
                    {
                      goalsData.bodyfat_graph.length > 0 &&
                      <Chart data={goalsData.bodyfat_graph} axes={axes} />
                    }
                  </div>
                </IonCol>
              </IonRow>
              }
              
            </IonGrid>
            {/* <IonIcon slot="end" md={chevronForwardSharp} ios={chevronForwardOutline} /> */}
          </IonItem>
        </IonCard>
        <IonCard class="card-main">
          <IonItem>
            <IonGrid>
              <IonRow onClick={()=>{onToggleGraph('musclegain_toggle')}}>
                <IonCol class="goals-info" size="8">
                  <p>
                    <strong>Muscle Gain</strong>
                  </p>
                  <p>
                    <span className="item_goal"><strong>Starting</strong> </span> {goalsData.goalmusclegain_start} lbs
                  </p>
                  <p>
                    <span className="item_goal"><strong>Goal</strong> </span> {goalsData.goalmusclegain} lbs
                  </p>
                  <p>
                    <span className="item_goal"><strong>Current</strong> </span> {goalsData.goalmusclegain_latest} lbs
                  </p>
                </IonCol>
                <IonCol>
                  <p className="handle-font">
                    <strong>% of Goal to date</strong>
                  </p>
                  <CircularProgressbar value={goalsData.goalmusclegain_percent} text={`${goalsData.goalmusclegain_percent}%`} />
                </IonCol>
                <IonCol size="1">
                  <IonIcon class="icon-handle" md={chevronForwardSharp} ios={chevronForwardOutline} />
                </IonCol>
              </IonRow>
              {
                goalsData.musclegain_toggle &&
                <IonRow>
                <IonCol>
                  <div
                    style={{
                      height: '300px'
                    }}
                  >
                    {
                      goalsData.musclegain_graph.length > 0 &&
                      <Chart data={goalsData.musclegain_graph} axes={axes} />
                    }
                  </div>
                </IonCol>
              </IonRow>
              }
            </IonGrid>
            {/* <IonIcon slot="end" md={chevronForwardSharp} ios={chevronForwardOutline} /> */}
          </IonItem>
        </IonCard>
      </IonContent>
      <FooterItems specific="goals" history={props.history} />

    </IonPage>
  );
};

export default Goals;
