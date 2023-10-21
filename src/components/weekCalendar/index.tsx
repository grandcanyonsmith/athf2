import React from 'react';
import { IonCol, IonRow } from '@ionic/react';
import './WeekCalendar.css';

interface ContainerProps {
    weekList: any;
    onDaySelection: Function;
}

const WeekCalendar: React.FC<ContainerProps> = ({weekList, onDaySelection}) => {

    return (
        <div>
            <IonRow class="week-list-row">
                {
                    weekList.map((item:any) =>(
                        <IonCol >
                            <div className={`week-list-col ${item.selected ? 'week-selected' : ''}`} onClick={()=>{onDaySelection(item.date)}}>
                                <div>{item.day}</div>
                                <div>{item.weekName}</div>
                            </div>
                        </IonCol>
                    ))
                }
            </IonRow>
        </div>
    )
};

export default WeekCalendar;
