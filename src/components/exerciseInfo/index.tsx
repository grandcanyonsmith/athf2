import React from 'react'
import { IonModal, IonContent, IonItem, IonText } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import Button from '../button';
// import { Media, Player, controls } from 'react-media-player'
import ReactPlayer from 'react-player'
import './ExerciseInfo.css';
// const { PlayPause, MuteUnmute, Fullscreen } = controls
// import '~video-react/dist/video-react.css';
// import { Player } from 'video-react';

interface ContainerProps {
  showModal: boolean;
  onExerciseInfo: Function;
  videoData: any
}

const ExerciseInfo: React.FC<ContainerProps> = ({ showModal, onExerciseInfo, videoData }) => {
  // const platform = Capacitor.getPlatform();
  return (
    <IonContent class="modal-ion-content spec_video_modal">
      <IonModal isOpen={showModal} cssClass="exercise_info_modal">
        <div className="spec-top-container">
          <IonItem lines="none" class="ion-text-center">
            <h5 className="hdr-txt-modal">
            <strong>{videoData.name}</strong>
            </h5>
          </IonItem>
          <div className="react-player-section">
            <ReactPlayer url={videoData.video_url} autoplay={true} controls={true}/>
          </div>
        </div>

        <div className="ion-modal-footer spec_modal_exercise_video">
          <Button text='OK' onAction={() => { onExerciseInfo(false, -1) }} />
        </div>
      </IonModal>
    </IonContent>
  )
};

export default ExerciseInfo;


// import React from 'react'
// import { Capacitor } from '@capacitor/core';
// import { useState, useEffect, useRef } from 'react';
// import { useVideoPlayer } from 'react-video-player-hook';
// import { ExitStatus } from 'typescript';
// import { IonModal } from '@ionic/react';
// import Button from '../button';

// interface ContainerProps {
//     showModal: boolean;
//     onExerciseInfo: Function;
// }

// const specurl:any = undefined;

// const VideoPlayer: React.FC<ContainerProps> = ({ showModal, onExerciseInfo }) => {
//     const [url, setUrl] = useState( specurl );
//     const platform = Capacitor.getPlatform();

//     let apiTimer1:any = useRef();
//     let apiTimer2:any = useRef();
//     let apiCount:any = useRef(-1);
//     const exit:any = useRef(false)

//     const onPlay = async (fromPlayerId:any,currentTime:any) => {
//         if(!exit.current) {
//             const mIsPlaying = await isPlaying(fromPlayerId);
//             console.log("==> mIsPlaying " + JSON.stringify(mIsPlaying));
//             apiCount.current += 1;
//             if(apiCount.current === 0) {
//                 const volume = await getVolume(fromPlayerId);
//                 if(volume.result) {
//                     console.log("==> volume " + volume.value);
//                 } else {
//                     console.log("==> volume " + volume.message);
//                 }
//                 apiTimer1.current = setTimeout(async () => {
//                     const duration = await getDuration(fromPlayerId);
//                     console.log("==> duration " + 
//                                 JSON.stringify(duration));
//                     if(duration.result) {
//                         console.log("==> duration " + duration.value);
//                     } else {
//                         console.log("==> duration " + duration.message);
//                     }
//                     const volume = await setVolume(fromPlayerId,0.2);
//                     console.log("====> Volume ",volume.value);
//                     const currentTime = await getCurrentTime(
//                                         fromPlayerId);
//                     if(currentTime.result) {
//                         console.log('==> currentTime ' + 
//                                 currentTime.value);
//                         const seektime = currentTime.value + 
//                                 0.4 * duration.value; 
//                         console.log("seektime" + seektime)
//                         const sCurrentTime = await setCurrentTime(
//                                                 fromPlayerId,seektime);
//                         console.log("==> setCurrentTime " + 
//                                 sCurrentTime.value);
//                     }
//                     const mPause = await pause(fromPlayerId);
//                     console.log('==> mPause ', mPause);
//                 }, 10000);
//             } 
//         }
//     };
//     const onPause = async (fromPlayerId:any,currentTime:any) => {
//             if(!exit.current) {
//             if(apiCount.current === 0) {
//                 apiCount.current += 1;
//                 const mIsPlaying = await isPlaying(fromPlayerId);
//                 console.log("==> in Pause mIsPlaying " +
//                         mIsPlaying.value);
//                 const volume = await getVolume(fromPlayerId);
//                 if(volume.result) {
//                     console.log("==> volume " + volume.value);
//                 }                
//                 const currentTime = await getCurrentTime(fromPlayerId);
//                 if(currentTime.result) {
//                     console.log('==> currentTime ' + currentTime.value);
//                 }
//                 let muted = await getMuted(fromPlayerId);
//                 console.log("==> muted before setMuted " + muted.value);
//                 muted = await setMuted(fromPlayerId,!muted.value);
//                 console.log("==> setMuted " + muted.value);
//                 muted = await getMuted(fromPlayerId);
//                 console.log("==> muted after setMuted " + muted.value);
//                 apiTimer2.current = setTimeout(async () => {
//                     const duration = await getDuration(fromPlayerId);
//                     const rCurrentTime = await setCurrentTime(
//                                         fromPlayerId,duration.value - 4);
//                     console.log('====> setCurrentTime ',
//                             rCurrentTime.value);
//                     await play(fromPlayerId);
//                 }, 4000);
//             }
//         }
//     };
//     const onReady = (fromPlayerId:any,currentTime:any) => {
//         console.log("in OnReady playerId " + fromPlayerId +
//                 " currentTime " + currentTime);
//     };
//     const onEnded = (fromPlayerId:any,currentTime:any) => {
//         console.log("in OnEnded playerId " + fromPlayerId +
//                 " currentTime " + currentTime);
//         exitClear();
//     };
//     const onExit = (dismiss:any) => {
//         console.log("in OnExit dismiss " + dismiss);
//         exitClear();
//     };
//     const exitClear = () => {
//         let status:any = ExitStatus;
//         if(!status.current) {
//             console.log("%%%% in cleanup Timers %%%%")
//             window.clearTimeout(apiTimer1.current);
//             window.clearTimeout(apiTimer2.current);
//             apiTimer1.current = 0;
//             apiTimer2.current = 0;
//             console.log("apiTimer1.current " + apiTimer1.current)
//             console.log("apiTimer2.current " + apiTimer2.current)
//             exit.current = true;
//             console.log("exit.current " + exit.current)
//             setUrl("");
//             console.log("url " + url)
//         }
//     };
//     const {initPlayer, isPlaying, pause, play, getDuration, setVolume,
//         getVolume, setMuted, getMuted, setCurrentTime, getCurrentTime,
//         stopAllPlayers} = useVideoPlayer({
//             onReady,
//             onPlay,
//             onPause,
//             onEnded,
//             onExit
//     });

//     useEffect(  () => {
//         if ( platform === "ios" || platform === "android" ) {
//             // test url from public/assets
//             setUrl( 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4' )
//         } else {
//             // test url from http:
//             setUrl( 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4' )
//         }
//     }, [platform, url] )


//     useEffect( () => {
//         console.log("%%%%% starting useEffect exit " + exit.current + " %%%%%")

//         if( url && !exit.current ) {
//             // test mode "embedded" for video player on Web platform
//             const playerWeb = async () => {
//             let res:any =   await initPlayer( "embedded", url,
//                 "fullscreen-video",'div', 1280, 720);

//                 if ( res.result.result && res.result.value ) {
//                     res = await play( "fullscreen-video" );
//                 }
// /*                // test mode "fullscreen" for video player on Web platform
//                 await initPlayer( "fullscreen", url,
//                                    "fullscreen-video",'div');
// */
//             }
//             // test mode "fullscreen" for video player 
//             // on native platforms
//             const playerNative = async () => {
//                 try {
//                     // last dummy param
//                     await initPlayer("fullscreen", url,
//                                      "fullscreen-video", 'div');

//                 } catch ( error ) {
//                     console.log( error );
//                 }
//             }
//             if ( platform === "ios" || platform === "android" )
//                 playerNative();
//             else
//                 playerWeb(); 

//         }

//     }, [initPlayer, play, isPlaying, pause, getDuration,
//         getVolume, setVolume, getCurrentTime, setCurrentTime, 
//         getMuted, setMuted, stopAllPlayers,
//         platform, url, exit] );

//     return (
//         // <IonModal isOpen={showModal} cssClass="exercise_info_modal">
//         <>
//         <div className="main-container">
//             {(!exit.current) &&
//                 <div id="fullscreen-video" slot="fixed">
//                 </div>
//             }
//         </div>
//         <div className="ion-modal-footer">
//             <Button text='OK' onAction={() => { onExerciseInfo(false) }} />
//         </div>
//         </>
//         // </IonModal>
//     )
// }

// export default VideoPlayer
// // import React from 'react';
// // import { IonModal, IonContent, IonItem, IonIcon, IonCol, IonSelect, IonSelectOption, IonDatetime, IonText, IonRow } from '@ionic/react';
// // import { closeOutline, closeSharp } from 'ionicons/icons';
// // import Button from '../button';
// // import './ExerciseInfo.css';

// // interface ContainerProps {
// //     showModal: boolean;
// //     onExerciseInfo: Function;
// // }

// // const ExerciseInfo: React.FC<ContainerProps> = ({ showModal, onExerciseInfo }) => {
// //     return (
// //         <IonContent class="modal-ion-content">
// //         <IonModal isOpen={showModal} cssClass="exercise_info_modal">
// //              <div className="spec-top-container">
// //                 <IonItem lines="none">
// //                     <IonText>
// //                         Hero
// //                     </IonText>
// //                 </IonItem>
// //                 <video autoPlay muted controls>
// //                         <source  src="http://img.mobiscroll.com/demos/trailer_iphone.m4v" type="video/x-m4v" />
// //                     </video>
// //              </div>

// //             <div className="ion-modal-footer">
// //                 <Button text='OK' onAction={() => { onExerciseInfo(false) }} />
// //             </div>
// //         </IonModal>
// //         </IonContent>
// //     )};

// // export default ExerciseInfo;
