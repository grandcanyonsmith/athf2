// import React from 'react';
// import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonImg, IonRouterOutlet } from '@ionic/react';
// // import { useLocation } from 'react-router-dom';
// import './TabsContainer.css';


// const TabsContainer: React.FC = () => {
// //   const location = useLocation();
//     return (
//     <IonTabs>
//         <IonTabBar slot="bottom">
//             <IonTabButton tab="nutrition" href="/tabs/nutrition">
//                 {/* {
//                     location.pathname === '/tabs/nutrition' ? 
//                     <IonImg src="/assets/nutrition_active.png" />:
//                     <IonImg src="/assets/nutrition.png" />
//                 } */}
//                 <IonLabel>Nutrition</IonLabel>
//             </IonTabButton>

//             <IonTabButton tab="exercise" href="/tabs/exercise">
//             {/* {
//                     location.pathname === '/tabs/exercise' ? 
//                     <IonImg src="/assets/exercise_active.png" />:
//                     <IonImg src="/assets/exercise.png" />
//                 } */}
//                 <IonLabel>Exercise</IonLabel>
//             </IonTabButton>

//             <IonTabButton tab="goals" href="/tabs/goals">
//             {/* {
//                     location.pathname === '/tabs/goals' ? 
//                     <IonImg src="/assets/goals_active.png" />:
//                     <IonImg src="/assets/goals.png" />
//                 } */}

//                 <IonLabel>Goals</IonLabel>
//             </IonTabButton>

//             <IonTabButton tab="grocery" href="/tabs/grocery">
//             {/* {
//                     location.pathname === '/tabs/grocery' ? 
//                     <IonImg src="/assets/grocery_active.png" />:
//                     <IonImg src="/assets/grocery.png" />
//                 } */}

//                 <IonLabel class="grocery-label">Grocery List</IonLabel>
//             </IonTabButton>
//         </IonTabBar>
//     </IonTabs>
// )};

// export default TabsContainer;

// import React from 'react';
// import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
// import { calendar, personCircle, map, informationCircle } from 'ionicons/icons';


// const TabsContainer: React.FC = () => (
//   <IonTabs>
//     <IonTabBar slot="bottom">
//       <IonTabButton tab="schedule">
//         <IonIcon icon={calendar} />
//         <IonLabel>Schedule</IonLabel>
//         <IonBadge>6</IonBadge>
//       </IonTabButton>

//       <IonTabButton tab="speakers">
//         <IonIcon icon={personCircle} />
//         <IonLabel>Speakers</IonLabel>
//       </IonTabButton>

//       <IonTabButton tab="map">
//         <IonIcon icon={map} />
//         <IonLabel>Map</IonLabel>
//       </IonTabButton>

//       <IonTabButton tab="about">
//         <IonIcon icon={informationCircle} />
//         <IonLabel>About</IonLabel>
//       </IonTabButton>
//     </IonTabBar>
//   </IonTabs>
// );

// export default TabsContainer;

import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonContent } from '@ionic/react';
import { call, person, settings } from 'ionicons/icons';

const TabsContainer: React.FC = () => (
  <IonContent>
    <IonTabs>
      {/*-- Tab bar --*/}
      <IonTabBar slot="bottom">
        <IonTabButton tab="account">
          <IonIcon icon={person} />
        </IonTabButton>
        <IonTabButton tab="contact">
          <IonIcon icon={call} />
        </IonTabButton>
        <IonTabButton tab="settings">
          <IonIcon icon={settings} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonContent>
);

export default TabsContainer;
