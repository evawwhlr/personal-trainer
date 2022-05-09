import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' 

export default function Calender() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => data.content.map((eve) => eve = {...eve, title: eve.activity, start: eve.date, end: (new Date(eve.date) + eve.duration)}))
        .then(data => {
            console.log(data);
            setTrainings(data)})
        .then(console.log(trainings))
        .catch(err => console.error(err))
    };


    return (
       <>
        <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
        initialView="dayGridMonth"
        events={trainings}
        editable={true}
        selectable={true}
        />    
       </>
    );
}